import type { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { GenericSM } from "../../common/service/generic.sm";
import { User } from "../../data/do/user.do";

export class UserSM extends GenericSM<User, string, Repository<User>> {}

export const userSM = new UserSM(AppDataSource.getRepository(User));
