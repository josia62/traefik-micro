import { GenericFactory } from "../../common/constraint/factory/generic.factory";
import type { Payment } from "../../data/do/payment.do";
import type { PaymentRequestDTO } from "../../data/dto/payment/payment-request.dto";
import type { PaymentResponseDTO } from "../../data/dto/payment/payment-response.dto";

const commonSchema = {
  userId: "userId",
  amount: "amount",
};

const responseSchema = {
  id: "id",
  ...commonSchema,
  createdAt: "createdAt",
  updatedAt: "updatedAt",
};

export class PaymentFactory extends GenericFactory<Payment, PaymentRequestDTO, PaymentResponseDTO> {}

export const paymentFactory = new PaymentFactory(commonSchema, commonSchema, responseSchema);
