import bcrypt from "bcryptjs";
import { Entity, Column, BeforeInsert, BeforeUpdate } from "typeorm";
import { Base } from "./base.do";

@Entity()
export class User extends Base {
  @Column("varchar")
  firstName: string;

  @Column("varchar")
  lastName: string;

  @Column("varchar")
  email: string;

  @Column("text")
  password: string;

  @Column("int")
  age: number;

  @Column("varchar", { nullable: true, default: "" })
  socketId?: string;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  @BeforeUpdate()
  async hashPasswordUpdate() {
    if (this.password && !this.password.startsWith("$2a$")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
