import { morphism } from "morphism";

export abstract class GenericFactory<TDo extends object, TRequestDto extends object, TResponseDto extends object> {
  protected mapper;

  constructor(
    protected targetDoSchema: any,
    protected targetRequestDtoSchema: any,
    protected targetResponseDtoSchema: any,
  ) {
    this.mapper = morphism;
  }

  toRequestDto(source: TDo | TDo[]): TRequestDto {
    return this.mapper(this.targetRequestDtoSchema, source) as TRequestDto;
  }

  toResponseDto(source: TDo | TDo[]): TResponseDto {
    return this.mapper(this.targetResponseDtoSchema, source) as TResponseDto;
  }

  toDo(source: TRequestDto | TResponseDto | TRequestDto[] | TResponseDto[]): TDo {
    return this.mapper(this.targetDoSchema, source) as TDo;
  }
}
