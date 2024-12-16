import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { UserServiceClient as _UserProto_UserServiceClient, UserServiceDefinition as _UserProto_UserServiceDefinition } from './UserProto/UserService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  UserProto: {
    UserIdRequestDTO: MessageTypeDefinition
    UserRequestDTO: MessageTypeDefinition
    UserResponseDTO: MessageTypeDefinition
    UserService: SubtypeConstructor<typeof grpc.Client, _UserProto_UserServiceClient> & { service: _UserProto_UserServiceDefinition }
  }
  google: {
    protobuf: {
      Empty: MessageTypeDefinition
    }
  }
}

