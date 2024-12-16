import type { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { GenericSM } from "../../common/service/generic.sm";
import { Payment } from "../../data/do/payment.do";

export class PaymentSM extends GenericSM<Payment, string, Repository<Payment>> {}

export const paymentSM = new PaymentSM(AppDataSource.getRepository(Payment));
