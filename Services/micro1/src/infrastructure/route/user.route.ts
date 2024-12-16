import { Router } from "express";
import { userController } from "../controller/user.controller";

const userRoutes = () => {
  const router = Router();
  router.get("/:id", userController.getUserByIdREST);
  router.post("/", userController.createUserREST);
  return router;
};

export const userRouter = userRoutes();
