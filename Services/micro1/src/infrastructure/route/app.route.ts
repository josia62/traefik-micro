import { Router } from "express";

import { userRouter } from "./user.route";

const appRoutes = () => {
  const router = Router();
  router.use("/user", userRouter);
  return router;
};

export const appRouter = appRoutes();
