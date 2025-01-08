var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

// src/data/constants/configs.ts
import dotenv from "dotenv";
import { cleanEnv, str, num, host, port } from "envalid";
dotenv.config();
var configs = cleanEnv(process.env, {
  NODE_ENV: str({ default: "development", choices: ["development", "production", "test"] }),
  HOST: host({ default: "localhost" }),
  REST_PORT: port({ default: 4e3 }),
  GRPC_PORT: port({ default: 8e3 }),
  CORS_ORIGIN: str({ default: "http://localhost:3000" }),
  COMMON_RATE_LIMIT_MAX_REQUESTS: num({ default: 1e3 }),
  COMMON_RATE_LIMIT_WINDOW_MS: num({ default: 1e3 }),
  DB_TYPE: str({ default: "postgres" }),
  DB_HOST: host({ default: "localhost" }),
  DB_PORT: port({ default: 5432 }),
  DB_USER: str({ default: "postgres" }),
  DB_PASS: str({ default: "" }),
  DB_NAME: str({ default: "" }),
  JWT_EXPIRATION: str({ default: "3600s" }),
  JWT_REFRESH_TOKEN_EXPIRATION: str({ default: "3600s" }),
  JWT_SECRET: str({ default: "" }),
  PWD_RESET_EXPIRATION: str({ default: "3600s" }),
  PWD_RESET_SECRET: str({ default: "" })
});

// src/data/constants/http-status.ts
var HttpStatus = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500
};

// src/service/middleware/exception-handler.ts
var Exception = class extends Error {
  statusCode;
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
};
var exceptionHandler = (err, req, res, next) => {
  if (err) {
    const { statusCode, message } = err;
    res.status(statusCode || HttpStatus.INTERNAL_SERVER_ERROR).send({ message, isError: true, data: null });
  } else {
    next();
  }
};

// src/common/infrastructure/generic.controller.ts
var GenericController = class {
  serviceSA;
  constructor(serviceSA) {
    this.serviceSA = serviceSA;
  }
  /**
   * WS gérant la création d'une entité
   */
  create = async (req, res, next) => {
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
  update = async (req, res, next) => {
    const {
      body,
      params: { id }
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
  partialUpdate = async (req, res, next) => {
    const {
      body,
      params: { id }
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
  deleteMany = async (req, res, next) => {
    const {
      body: { ids }
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
  delete = async (req, res, next) => {
    const {
      params: { id }
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
  findById = async (req, res, next) => {
    const {
      params: { id }
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
  findOne = async (req, res, next) => {
    const { query } = req;
    try {
      const found = await this.serviceSA.findOne(query);
      res.locals.data = found;
      next();
    } catch (error) {
      next(error);
    }
  };
  findAll = async (req, res, next) => {
    try {
      const allEntities = await this.serviceSA.findAll();
      res.locals.data = allEntities;
      res.locals.statusCode = HttpStatus.OK;
      next();
    } catch (error) {
      next(error);
    }
  };
};

// src/common/service/generic.sa.ts
import {
  getRepository
} from "typeorm";
var GenericSA = class {
  serviceSM;
  factory;
  name;
  constructor(serviceSM, factory, name) {
    this.serviceSM = serviceSM;
    this.factory = factory;
    this.name = name;
  }
  async create(dto) {
    try {
      const entity = this.factory.toDo(dto);
      const result = await this.serviceSM.create(entity);
      return this.factory.toResponseDto(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async update(id, dto) {
    try {
      const entity = this.factory.toDo(dto);
      const result = await this.serviceSM.update(id, entity);
      return this.factory.toResponseDto(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async partialUpdate(id, partialEntity) {
    try {
      const result = await this.serviceSM.update(id, partialEntity);
      return this.factory.toResponseDto(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  delete(id) {
    return this.serviceSM.delete(id);
  }
  deleteMany(ids) {
    return this.serviceSM.deleteMany(ids);
  }
  async updateMany(ids) {
    return await getRepository(this.name).createQueryBuilder().update().set({ isdelete: 1 }).where("id IN (:...ids)", { ids }).execute();
  }
  async updateAll(where) {
    return await getRepository(this.name).createQueryBuilder().update().set({ isdelete: 1 }).where(where ?? {}).execute();
  }
  async findById(id) {
    try {
      const result = await this.serviceSM.findById(id);
      return this.factory.toResponseDto(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async findOne(option) {
    try {
      const result = await this.serviceSM.findOne(option);
      return this.factory.toResponseDto(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async findAll(options = {}) {
    try {
      const results = await this.serviceSM.findAll(options);
      return results.map((result) => this.factory.toResponseDto(result));
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

// src/data-source.ts
import "reflect-metadata";
import { DataSource } from "typeorm";

// src/data/do/user.do.ts
import bcrypt from "bcryptjs";
import { Entity, Column, BeforeInsert, BeforeUpdate } from "typeorm";

// src/data/do/base.do.ts
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
var Base = class {
  id;
  createdAt;
  updatedAt;
};
__decorateClass([
  PrimaryGeneratedColumn("uuid")
], Base.prototype, "id", 2);
__decorateClass([
  CreateDateColumn({ type: "timestamp" })
], Base.prototype, "createdAt", 2);
__decorateClass([
  UpdateDateColumn({ type: "timestamp" })
], Base.prototype, "updatedAt", 2);

// src/data/do/user.do.ts
var User = class extends Base {
  firstName;
  lastName;
  email;
  password;
  age;
  socketId;
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
  async hashPasswordUpdate() {
    if (this.password && !this.password.startsWith("$2a$")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
};
__decorateClass([
  Column("varchar")
], User.prototype, "firstName", 2);
__decorateClass([
  Column("varchar")
], User.prototype, "lastName", 2);
__decorateClass([
  Column("varchar")
], User.prototype, "email", 2);
__decorateClass([
  Column("text")
], User.prototype, "password", 2);
__decorateClass([
  Column("int")
], User.prototype, "age", 2);
__decorateClass([
  Column("varchar", { nullable: true, default: "" })
], User.prototype, "socketId", 2);
__decorateClass([
  BeforeInsert()
], User.prototype, "hashPassword", 1);
__decorateClass([
  BeforeUpdate()
], User.prototype, "hashPasswordUpdate", 1);
User = __decorateClass([
  Entity()
], User);

// src/data-source.ts
var { DB_HOST, DB_NAME, DB_PORT, DB_PASS, DB_USER, DB_TYPE, NODE_ENV } = configs;
var AppDataSource = new DataSource({
  type: DB_TYPE,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  synchronize: NODE_ENV !== "production",
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: []
});

// src/common/service/generic.sm.ts
import { In as In2 } from "typeorm";
var GenericSM = class {
  repository;
  constructor(repository) {
    this.repository = repository;
  }
  create(entity) {
    return this.repository.save(this.repository.create(entity));
  }
  async update(id, partialEntity) {
    try {
      const found = await this.findById(id);
      const updated = await this.repository.save(Object.assign(found, partialEntity));
      return updated;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async delete(id) {
    try {
      const { affected } = await this.repository.delete(id);
      if (affected) {
        return id;
      }
      throw new Exception(HttpStatus.BAD_REQUEST, `id: ${id} introuvable`);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async deleteMany(ids) {
    try {
      const entities = await this.repository.find({
        where: { id: In2(ids) }
      });
      if (!entities.length) {
        throw new Exception(HttpStatus.BAD_REQUEST, `ids: ${ids} introuvable`);
      }
      return this.repository.remove(entities);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async findById(id) {
    const found = await this.repository.findOne({
      where: { id }
    });
    if (!found) {
      throw new Exception(HttpStatus.BAD_REQUEST, `id: ${id} introuvable`);
    }
    return found;
  }
  findByIds(ids, options = {}) {
    return this.repository.find({
      where: {
        id: In2(ids),
        // Cast `ids` to `any` to bypass type issues
        ...options.where || {}
      },
      ...options
    });
  }
  async findOne(option) {
    const found = await this.repository.findOne({ where: option });
    if (!found) {
      throw new Exception(HttpStatus.BAD_REQUEST, "Entit\xE9 introuvable");
    }
    return found;
  }
  findOneRelation(option) {
    return this.repository.findOne(option);
  }
  async findAll(options = {}) {
    try {
      return await this.repository.find(options);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

// src/service/metier/user.sm.ts
var UserSM = class extends GenericSM {
};
var userSM = new UserSM(AppDataSource.getRepository(User));

// src/common/constraint/factory/generic.factory.ts
import { morphism } from "morphism";
var GenericFactory = class {
  constructor(targetDoSchema, targetRequestDtoSchema, targetResponseDtoSchema) {
    this.targetDoSchema = targetDoSchema;
    this.targetRequestDtoSchema = targetRequestDtoSchema;
    this.targetResponseDtoSchema = targetResponseDtoSchema;
    this.mapper = morphism;
  }
  mapper;
  toRequestDto(source) {
    return this.mapper(this.targetRequestDtoSchema, source);
  }
  toResponseDto(source) {
    return this.mapper(this.targetResponseDtoSchema, source);
  }
  toDo(source) {
    return this.mapper(this.targetDoSchema, source);
  }
};

// src/constraint/factory/user.factory.ts
var commonSchema = {
  email: "email",
  firstName: "firstName",
  lastName: "lastName",
  age: "age"
};
var schema = {
  ...commonSchema,
  password: "password"
};
var responseSchema = {
  id: "id",
  socketId: "socketId",
  ...commonSchema,
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var UserFactory = class extends GenericFactory {
};
var userFactory = new UserFactory(schema, schema, responseSchema);

// src/service/applicatif/user.sa.ts
var UserSA = class extends GenericSA {
  async getUserById(userId) {
    return this.serviceSM.findOne({ id: userId });
  }
};
var userSA = new UserSA(userSM, userFactory, "user");

// src/infrastructure/controller/user.controller.ts
var UserController = class extends GenericController {
  getUserByIdREST = async (req, res, next) => {
    const {
      params: { id }
    } = req;
    const response = await this.serviceSA.findById(id);
    res.locals.data = response;
    next();
  };
  createUserREST = async (req, res, next) => {
    const { body } = req;
    const created = await this.serviceSA.create(body);
    res.locals.data = created;
    res.locals.statusCode = HttpStatus.CREATED;
    next();
  };
  getUserById = async (id) => {
    return await this.serviceSA.findById(id);
  };
  createUser = async (data) => {
    await this.serviceSA.create(data);
  };
};
var userController = new UserController(userSA);

export {
  __require,
  __commonJS,
  __toESM,
  HttpStatus,
  configs,
  AppDataSource,
  exceptionHandler,
  userController
};
