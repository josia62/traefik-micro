import { databaseConnect } from "./service/middleware/database";
import express, { type Express } from "express";
import errorHandler from "@/common/middleware/errorHandler";
import { responseFormatter } from "./service/middleware/response-formatter";
import { exceptionHandler } from "./service/middleware/exception-handler";
import { configs } from "@/data/constants/configs";
import { logger } from "./common/logger";
import requestLogger from "@/common/middleware/requestLogger";

const { REST_PORT } = configs;
export const app = express();

class App {
  private initMiddlewares = async () => {
    app.set("trust proxy", true);
    app.set("timeout", 600000);
    app.use(express.urlencoded({ extended: true, limit: "25mb" }));
    app.use(express.json({ limit: "25mb" }));
  };

  private initRoutes = async () => {
    app.use(requestLogger);
    const { appRouter } = await import("./infrastructure/route/app.route");
    app.use("/api", appRouter, responseFormatter);
    app.use(errorHandler());
    app.use(exceptionHandler);
  };

  public init = async () => {
    try {
      await databaseConnect();
      await this.initMiddlewares();
      await this.initRoutes();
      return app.listen(REST_PORT, () => logger.info(`REST Server listening on ${REST_PORT}`));
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

export default new App();
