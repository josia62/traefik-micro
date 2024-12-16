// Original file: src/data/proto/user.proto

import type * as grpc from "@grpc/grpc-js";
import type { MethodDefinition } from "@grpc/proto-loader";
import type {
  Empty as _google_protobuf_Empty,
  Empty__Output as _google_protobuf_Empty__Output,
} from "../google/protobuf/Empty";
import type {
  UserIdRequestDTO as _UserProto_UserIdRequestDTO,
  UserIdRequestDTO__Output as _UserProto_UserIdRequestDTO__Output,
} from "../UserProto/UserIdRequestDTO";
import type {
  UserRequestDTO as _UserProto_UserRequestDTO,
  UserRequestDTO__Output as _UserProto_UserRequestDTO__Output,
} from "../UserProto/UserRequestDTO";
import type {
  UserResponseDTO as _UserProto_UserResponseDTO,
  UserResponseDTO__Output as _UserProto_UserResponseDTO__Output,
} from "../UserProto/UserResponseDTO";

export interface UserServiceClient extends grpc.Client {
  createUser(
    argument: _UserProto_UserRequestDTO,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_google_protobuf_Empty__Output>,
  ): grpc.ClientUnaryCall;
  createUser(
    argument: _UserProto_UserRequestDTO,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_google_protobuf_Empty__Output>,
  ): grpc.ClientUnaryCall;
  createUser(
    argument: _UserProto_UserRequestDTO,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_google_protobuf_Empty__Output>,
  ): grpc.ClientUnaryCall;
  createUser(
    argument: _UserProto_UserRequestDTO,
    callback: grpc.requestCallback<_google_protobuf_Empty__Output>,
  ): grpc.ClientUnaryCall;

  getUserById(
    argument: _UserProto_UserIdRequestDTO,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_UserProto_UserResponseDTO__Output>,
  ): grpc.ClientUnaryCall;
  getUserById(
    argument: _UserProto_UserIdRequestDTO,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_UserProto_UserResponseDTO__Output>,
  ): grpc.ClientUnaryCall;
  getUserById(
    argument: _UserProto_UserIdRequestDTO,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_UserProto_UserResponseDTO__Output>,
  ): grpc.ClientUnaryCall;
  getUserById(
    argument: _UserProto_UserIdRequestDTO,
    callback: grpc.requestCallback<_UserProto_UserResponseDTO__Output>,
  ): grpc.ClientUnaryCall;
}

export interface UserServiceHandlers extends grpc.UntypedServiceImplementation {
  createUser: grpc.handleUnaryCall<_UserProto_UserRequestDTO__Output, _google_protobuf_Empty>;

  getUserById: grpc.handleUnaryCall<_UserProto_UserIdRequestDTO__Output, _UserProto_UserResponseDTO>;
}

export interface UserServiceDefinition extends grpc.ServiceDefinition {
  createUser: MethodDefinition<
    _UserProto_UserRequestDTO,
    _google_protobuf_Empty,
    _UserProto_UserRequestDTO__Output,
    _google_protobuf_Empty__Output
  >;
  getUserById: MethodDefinition<
    _UserProto_UserIdRequestDTO,
    _UserProto_UserResponseDTO,
    _UserProto_UserIdRequestDTO__Output,
    _UserProto_UserResponseDTO__Output
  >;
}
