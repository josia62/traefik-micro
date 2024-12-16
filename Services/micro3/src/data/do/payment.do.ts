import bcrypt from "bcryptjs";
import { Entity, Column, BeforeInsert, BeforeUpdate } from "typeorm";
import { Base } from "./base.do";

@Entity()
export class Payment extends Base {
  @Column("varchar")
  userId: string;

  @Column("int")
  amount: number;
}
