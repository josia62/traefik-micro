import {
  paymentController
} from "./chunk-V6EOTVIB.mjs";

// src/infrastructure/route/app.route.ts
import { Router as Router2 } from "express";

// src/infrastructure/route/payment.route.ts
import { Router } from "express";
var paymentRoutes = () => {
  const router = Router();
  router.post("/", paymentController.makePaymentREST);
  return router;
};
var paymentRouter = paymentRoutes();

// src/infrastructure/route/app.route.ts
var appRoutes = () => {
  const router = Router2();
  router.use("/payment", paymentRouter);
  return router;
};
var appRouter = appRoutes();
export {
  appRouter
};
