import { Router } from "express";
import { paymentController } from "../controller/payment.controller";

const paymentRoutes = () => {
  const router = Router();
  router.post("/", paymentController.makePaymentREST);
  return router;
};

export const paymentRouter = paymentRoutes();
