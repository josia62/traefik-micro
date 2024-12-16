import { GenericSA } from "../../common/service/generic.sa";
import type { Payment } from "../../data/do/payment.do";
import type { PaymentRequestDTO } from "../../data/dto/payment/payment-request.dto";
import type { PaymentResponseDTO } from "../../data/dto/payment/payment-response.dto";
import type { PaymentSM } from "../metier/payment.sm";
import { paymentSM } from "../metier/payment.sm";
import type { PaymentFactory } from "../../constraint/factory/payment.factory";
import { paymentFactory } from "../../constraint/factory/payment.factory";
import { userClient } from "@/common/infrastructure/grpc.service";
import type { UserResponseDTO } from "@/data/proto/UserProto/UserResponseDTO";

export class PaymentSA extends GenericSA<Payment, PaymentRequestDTO, PaymentResponseDTO, PaymentSM, PaymentFactory> {
  async getUserById(userId: string) {
    const userIdRequest = {
      id: userId,
    };
    try {
      const response = await new Promise<UserResponseDTO>((resolve, reject) => {
        userClient.getUserById(userIdRequest, (error, response) => {
          if (error) {
            return reject(error);
          }
          resolve(response);
        });
      });
      return response;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  }
}

export const paymentSA = new PaymentSA(paymentSM, paymentFactory, "payment");
