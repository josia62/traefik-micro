import * as grpc from "@grpc/grpc-js";
import { serviceGRPC } from "@/common/infrastructure/grpc.service";
import { makePayment } from "@/infrastructure/grpc/payment/payment.grpc";

const serverGrpc = new grpc.Server();
serverGrpc.addService(serviceGRPC.paymentService, {
  makePayment,
});
export default serverGrpc;
