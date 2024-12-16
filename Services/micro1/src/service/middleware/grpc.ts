import * as grpc from "@grpc/grpc-js";
import { serviceGRPC } from "@/common/infrastructure/grpc.service";
import { createUser, getUserById } from "@/infrastructure/grpc/degree/user.grpc";

const serverGrpc = new grpc.Server();
serverGrpc.addService(serviceGRPC.userService, {
  getUserById,
  createUser,
});
export default serverGrpc;
