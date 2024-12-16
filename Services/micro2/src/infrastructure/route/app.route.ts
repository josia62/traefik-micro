import { Router } from "express";

import { paymentRouter } from "./payment.route";

const appRoutes = () => {
  const router = Router();
  router.use("/user", paymentRouter);
  return router;
};

export const appRouter = appRoutes();
