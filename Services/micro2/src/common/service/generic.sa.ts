import {
  type FindOptionsWhere,
  type Repository,
  getRepository,
  In,
  type ObjectLiteral,
  type DeepPartial,
  type FindManyOptions,
} from "typeorm";
import type { GenericFactory } from "../constraint/factory/generic.factory";
import type { GenericSM } from "./generic.sm";

export abstract class GenericSA<
  TDo extends ObjectLiteral,
  TRequestDto extends object,
  TResponseDto extends object,
  TSm extends GenericSM<TDo, number | string, Repository<TDo>>,
  TFactory extends GenericFactory<TDo, TRequestDto, TResponseDto>,
> {
  protected serviceSM: TSm;
  protected factory: TFactory;
  protected name: string;

  constructor(serviceSM: TSm, factory: TFactory, name: string) {
    this.serviceSM = serviceSM;
    this.factory = factory;
    this.name = name;
  }

  async create(dto: TRequestDto | TRequestDto[]): Promise<TResponseDto> {
    try {
      const entity = this.factory.toDo(dto);
      const result = await this.serviceSM.create(entity);
      return this.factory.toResponseDto(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async update(id: number | string, dto: TRequestDto): Promise<any> {
    try {
      const entity = this.factory.toDo(dto);
      // @ts-ignore
      const result = await this.serviceSM.update(id, entity);
      return this.factory.toResponseDto(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async partialUpdate(id: number | string, partialEntity: DeepPartial<TDo>): Promise<any> {
    try {
      const result = await this.serviceSM.update(id, partialEntity);
      return this.factory.toResponseDto(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  delete(id: number | string): Promise<any> {
    return this.serviceSM.delete(id);
  }

  deleteMany(ids: (number | string)[]): Promise<any> {
    return this.serviceSM.deleteMany(ids);
  }

  async updateMany(ids: (number | string)[]): Promise<any> {
    return await getRepository(this.name)
      .createQueryBuilder()
      .update()
      .set({ isdelete: 1 })
      .where("id IN (:...ids)", { ids })
      .execute();
  }

  async updateAll(where: FindOptionsWhere<TDo>): Promise<any> {
    return await getRepository(this.name)
      .createQueryBuilder()
      .update()
      .set({ isdelete: 1 })
      .where(where ?? {})
      .execute();
  }

  async findById(id: number | string): Promise<TResponseDto | null> {
    try {
      const result = await this.serviceSM.findById(id);
      return this.factory.toResponseDto(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOne(option: FindOptionsWhere<TDo>): Promise<TResponseDto | null> {
    try {
      const result = await this.serviceSM.findOne(option);
      return this.factory.toResponseDto(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findAll(options: FindManyOptions<TDo> = {}): Promise<TResponseDto[]> {
    try {
      const results = await this.serviceSM.findAll(options);
      return results.map((result) => this.factory.toResponseDto(result));
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
