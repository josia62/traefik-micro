import type { Request, Response, NextFunction } from "express";
import type { Repository, ObjectLiteral } from "typeorm";
import { HttpStatus } from "../../data/constants/http-status";
import type { GenericFactory } from "../constraint/factory/generic.factory";
import type { GenericSA } from "../service/generic.sa";
import type { GenericSM } from "../service/generic.sm";

export class GenericController<
  TDo extends ObjectLiteral,
  TRequestDto extends object,
  TResponseDto extends object,
  TSa extends GenericSA<
    TDo,
    TRequestDto,
    TResponseDto,
    GenericSM<TDo, string | number, Repository<TDo>>,
    GenericFactory<TDo, TRequestDto, TResponseDto>
  >,
> {
  serviceSA: TSa;

  constructor(serviceSA: TSa) {
    this.serviceSA = serviceSA;
  }

  /**
   * WS gérant la création d'une entité
   */
  create = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    try {
      const created = await this.serviceSA.create(body);

      res.locals.data = created;
      res.locals.statusCode = HttpStatus.CREATED;

      next();
    } catch (error) {
      next(error);
    }
  };

  /**
   * WS gérant la mise à jour d'une entité
   */
  update = async (req: Request, res: Response, next: NextFunction) => {
    const {
      body,
      params: { id },
    } = req;

    try {
      const updated = await this.serviceSA.update(id, body);

      res.locals.data = updated;
      res.locals.statusCode = HttpStatus.OK;

      next();
    } catch (error) {
      next(error);
    }
  };

  partialUpdate = async (req: Request, res: Response, next: NextFunction) => {
    const {
      body,
      params: { id },
    } = req;

    try {
      const updated = await this.serviceSA.partialUpdate(id, body);

      res.locals.data = updated;

      next();
    } catch (error) {
      next(error);
    }
  };

  /**
   * WS gérant la suppression d'une entité
   */
  deleteMany = async (req: Request, res: Response, next: NextFunction) => {
    const {
      body: { ids },
    } = req;

    try {
      const response = await this.serviceSA.deleteMany(ids);

      res.locals.data = response;

      next();
    } catch (error) {
      next(error);
    }
  };

  /**
   * WS gérant la suppression des entités
   */
  delete = async (req: Request, res: Response, next: NextFunction) => {
    const {
      params: { id },
    } = req;

    try {
      const response = await this.serviceSA.delete(id);

      res.locals.data = response;

      next();
    } catch (error) {
      next(error);
    }
  };

  /**
   * WS gérant la récupération d'une entité par son id
   */
  findById = async (req: Request, res: Response, next: NextFunction) => {
    const {
      params: { id },
    } = req;
    try {
      const found = await this.serviceSA.findById(id);

      res.locals.data = found;

      next();
    } catch (error) {
      next(error);
    }
  };

  /**
   * WS retournant le document répondant aux critères spécifiés
   */
  findOne = async (req: Request, res: Response, next: NextFunction) => {
    const { query } = req;
    try {
      const found = await this.serviceSA.findOne(query);

      res.locals.data = found;

      next();
    } catch (error) {
      next(error);
    }
  };

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allEntities = await this.serviceSA.findAll();

      res.locals.data = allEntities;
      res.locals.statusCode = HttpStatus.OK;

      next();
    } catch (error) {
      next(error);
    }
  };
}
