import dotenv from "dotenv";
import { cleanEnv, str, num, host, port } from "envalid";

// Load .env variables into process.env
dotenv.config();

// Validate and clean environment variables
export const configs = cleanEnv(process.env, {
  NODE_ENV: str({ default: "development", choices: ["development", "production", "test"] }),
  HOST: host({ default: "localhost" }),
  REST_PORT: port({ default: 4001 }),
  GRPC_PORT: port({ default: 8001 }),
  CORS_ORIGIN: str({ default: "http://localhost:3000" }),
  COMMON_RATE_LIMIT_MAX_REQUESTS: num({ default: 1000 }),
  COMMON_RATE_LIMIT_WINDOW_MS: num({ default: 1000 }),

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
  PWD_RESET_SECRET: str({ default: "" }),
});
