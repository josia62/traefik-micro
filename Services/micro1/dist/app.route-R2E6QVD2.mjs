import {
  userController
} from "./chunk-UQFQHBRR.mjs";

// src/infrastructure/route/app.route.ts
import { Router as Router2 } from "express";

// src/infrastructure/route/user.route.ts
import { Router } from "express";
var userRoutes = () => {
  const router = Router();
  router.get("/:id", userController.getUserByIdREST);
  router.post("/", userController.createUserREST);
  return router;
};
var userRouter = userRoutes();

// src/infrastructure/route/app.route.ts
var appRoutes = () => {
  const router = Router2();
  router.use("/user", userRouter);
  return router;
};
var appRouter = appRoutes();
export {
  appRouter
};
