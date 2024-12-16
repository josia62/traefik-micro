import type * as grpc from "@grpc/grpc-js";
import type { UserIdRequestDTO } from "@/data/proto/UserProto/UserIdRequestDTO";
import type { UserResponseDTO } from "@/data/proto/UserProto/UserResponseDTO";
import type { UserRequestDTO } from "@/data/proto/UserProto/UserRequestDTO";
import { userController } from "@/infrastructure/controller/user.controller";
import type { Empty } from "google-protobuf/google/protobuf/empty_pb";
import { Empty as EmptyValue } from "google-protobuf/google/protobuf/empty_pb";

export const getUserById = async (
  call: grpc.ServerUnaryCall<UserIdRequestDTO, grpc.Metadata>,
  callback: grpc.sendUnaryData<UserResponseDTO>,
) => {
  const userId = call?.request?.id || "";
  const response = await userController.getUserById(userId);
  callback(null, response);
};

export const createUser = async (
  call: grpc.ServerUnaryCall<UserRequestDTO, grpc.Metadata>,
  callback: grpc.sendUnaryData<Empty>,
) => {
  await userController.createUser(call.request);
  callback(null, new EmptyValue());
};
