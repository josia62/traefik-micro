import { Router } from "express";
import { paymentController } from "../controller/payment.controller";

const paymentRoutes = () => {
  const router = Router();
  router.post("/payment", paymentController.makePaymentREST);
  return router;
};

export const paymentRouter = paymentRoutes();
