import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./data/do/user.do";
import { configs } from "./data/constants/configs";

const { DB_HOST, DB_NAME, DB_PORT, DB_PASS, DB_USER, DB_TYPE, NODE_ENV } = configs;

export const AppDataSource = new DataSource({
  type: DB_TYPE as "postgres" | "mysql" | "mariadb" | "sqlite" | "mssql",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  synchronize: NODE_ENV !== "production",
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
