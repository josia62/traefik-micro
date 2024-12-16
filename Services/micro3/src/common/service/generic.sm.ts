import type { DeepPartial, ObjectLiteral, FindManyOptions, Repository, FindOptionsWhere } from "typeorm";

import { In } from "typeorm";
import { HttpStatus } from "../../data/constants/http-status";
import { Exception } from "../../service/middleware/exception-handler";

export abstract class GenericSM<TDo extends ObjectLiteral, TId, TRepository extends Repository<TDo>> {
  protected repository: TRepository;

  constructor(repository: TRepository) {
    this.repository = repository;
  }

  create(entity: TDo): Promise<TDo> {
    return this.repository.save(this.repository.create(entity));
  }

  async update(id: TId, partialEntity: DeepPartial<TDo>): Promise<any> {
    try {
      const found = await this.findById(id);
      const updated = await this.repository.save(Object.assign(found, partialEntity));
      return updated;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete(id: TId): Promise<any> {
    try {
      const { affected } = await this.repository.delete(id as any);

      if (affected) {
        return id;
      }

      throw new Exception(HttpStatus.BAD_REQUEST, `id: ${id} introuvable`);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteMany(ids: TId[]): Promise<any> {
    try {
      const entities = await this.repository.find({
        where: { id: In(ids as any) } as any,
      });
      if (!entities.length) {
        throw new Exception(HttpStatus.BAD_REQUEST, `ids: ${ids} introuvable`);
      }
      return this.repository.remove(entities);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findById(id: TId): Promise<TDo> {
    const found = await this.repository.findOne({
      where: { id } as any,
    });
    if (!found) {
      throw new Exception(HttpStatus.BAD_REQUEST, `id: ${id} introuvable`);
    }
    return found;
  }

  findByIds(ids: TId[], options: FindManyOptions<TDo> = {}): Promise<TDo[]> {
    return this.repository.find({
      where: {
        id: In(ids as any), // Cast `ids` to `any` to bypass type issues
        ...(options.where || {}),
      },
      ...options,
    });
  }

  async findOne(option: FindOptionsWhere<TDo>): Promise<TDo> {
    const found = await this.repository.findOne({ where: option });
    if (!found) {
      throw new Exception(HttpStatus.BAD_REQUEST, "Entité introuvable");
    }
    return found;
  }

  findOneRelation(option: any): Promise<any> {
    return this.repository.findOne(option);
  }

  async findAll(options: FindManyOptions<TDo> = {}): Promise<TDo[]> {
    try {
      return await this.repository.find(options);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
