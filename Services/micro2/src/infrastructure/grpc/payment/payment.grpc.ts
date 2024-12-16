import type * as grpc from "@grpc/grpc-js";
import type { PaymentRequestDTO } from "@/data/proto/PaymentProto/PaymentRequestDTO";
import type { PaymentResponseDTO } from "@/data/proto/PaymentProto/PaymentResponseDTO";
import { paymentController } from "@/infrastructure/controller/payment.controller";
import { handleGrpcError } from "@/common/utils/error-handler";

export const makePayment = async (
  call: grpc.ServerUnaryCall<PaymentRequestDTO, grpc.Metadata>,
  callback: grpc.sendUnaryData<PaymentResponseDTO>,
) => {
  try {
    const response = await paymentController.makePayment(call.request);
    callback(null, response);
  } catch (error: any) {
    handleGrpcError(callback, error);
  }
};
