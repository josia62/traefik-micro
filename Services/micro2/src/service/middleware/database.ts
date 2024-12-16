import { logger } from "@/common/logger";
import { AppDataSource } from "../../data-source";

export const databaseConnect = async () => {
  try {
    AppDataSource.initialize()
      .then(() => {
        logger.info("Database connected successfully");
      })
      .catch((error) => {
        logger.error("Error connecting to the database", error);
        process.exit(1);
      });
  } catch (error) {
    return Promise.reject(error);
  }
};
