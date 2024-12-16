import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { PaymentServiceClient as _PaymentProto_PaymentServiceClient, PaymentServiceDefinition as _PaymentProto_PaymentServiceDefinition } from './PaymentProto/PaymentService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  PaymentProto: {
    AllPaymentsResponseDTO: MessageTypeDefinition
    PaymentRequestDTO: MessageTypeDefinition
    PaymentResponseDTO: MessageTypeDefinition
    PaymentService: SubtypeConstructor<typeof grpc.Client, _PaymentProto_PaymentServiceClient> & { service: _PaymentProto_PaymentServiceDefinition }
    PaymentStructureDTO: MessageTypeDefinition
  }
  google: {
    protobuf: {
      Empty: MessageTypeDefinition
    }
  }
}

