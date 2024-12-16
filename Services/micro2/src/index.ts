import "reflect-metadata";
import * as grpc from "@grpc/grpc-js";
import serverGrpc from "./service/middleware/grpc";
import { configs } from "@/data/constants/configs";
import { logger } from "./common/logger";
import App from "./app";

const bootstrapAsync = async () => {
  const { GRPC_PORT } = configs;
  try {
    await App.init();
    serverGrpc.bindAsync(`localhost:${GRPC_PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
      if (err) {
        logger.error(err);
        return;
      }
      logger.info(`GRPC Server listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

bootstrapAsync();
