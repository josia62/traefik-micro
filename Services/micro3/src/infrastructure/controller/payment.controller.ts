import type { Payment } from "../../data/do/payment.do";
import type { PaymentRequestDTO } from "../../data/dto/payment/payment-request.dto";
import type { PaymentResponseDTO } from "../../data/dto/payment/payment-response.dto";
import { GenericController } from "@/common/infrastructure/generic.controller";
import type { PaymentSA } from "@/service/applicatif/payment.sa";
import { paymentSA } from "@/service/applicatif/payment.sa";
import type { PaymentRequestDTO as PaymentRequest } from "@/data/proto/PaymentProto/PaymentRequestDTO";
import type { UserResponseDTO } from "@/data/proto/UserProto/UserResponseDTO";
import type { Response, Request, NextFunction } from "express";
import { HttpStatus } from "@/data/constants/http-status";

class PaymentController extends GenericController<Payment, PaymentRequestDTO, PaymentResponseDTO, PaymentSA> {
  async makePayment(data: PaymentRequest) {
    const deposit = data.deposit || 0;
    const userId = data.userId || "";
    try {
      const response = await this.serviceSA.findOne({ userId: data.userId });
      const newAmount = response?.amount ? response.amount + deposit : deposit;
      response?.id && response.amount && (await this.serviceSA.update(response.id, { amount: newAmount }));
      const user: UserResponseDTO = await this.serviceSA.getUserById(userId);
      return {
        ...user,
        amount: newAmount,
      };
    } catch {
      await this.serviceSA.create({ userId, amount: deposit });
      const user: UserResponseDTO = await this.serviceSA.getUserById(userId);
      return {
        ...user,
        amount: deposit,
      };
    }
  }

  makePaymentREST = async (req: Request, res: Response, next: NextFunction) => {
    const { body: data } = req;
    const deposit = data.deposit || 0;
    const userId = data.userId || "";
    try {
      const response = await this.serviceSA.findOne({ userId: data.userId });
      const newAmount = response?.amount ? response.amount + deposit : deposit;
      response?.id && response.amount && (await this.serviceSA.update(response.id, { amount: newAmount }));
      const user: UserResponseDTO = await this.serviceSA.getUserById(userId);
      const responseBack = {
        ...user,
        amount: newAmount,
      };
      res.locals.data = responseBack;
      res.locals.statusCode = HttpStatus.OK;
      next();
    } catch {
      await this.serviceSA.create({ userId, amount: deposit });
      const user: UserResponseDTO = await this?.serviceSA?.getUserById(userId);
      const response = {
        ...user,
        amount: deposit,
      };
      res.locals.data = response;
      res.locals.statusCode = HttpStatus.CREATED;
      next();
    }
  };
}

export const paymentController = new PaymentController(paymentSA);
