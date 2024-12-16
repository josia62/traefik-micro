// Original file: src/data/proto/payment.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AllPaymentsResponseDTO as _PaymentProto_AllPaymentsResponseDTO, AllPaymentsResponseDTO__Output as _PaymentProto_AllPaymentsResponseDTO__Output } from '../PaymentProto/AllPaymentsResponseDTO';
import type { Empty as _google_protobuf_Empty, Empty__Output as _google_protobuf_Empty__Output } from '../google/protobuf/Empty';
import type { PaymentRequestDTO as _PaymentProto_PaymentRequestDTO, PaymentRequestDTO__Output as _PaymentProto_PaymentRequestDTO__Output } from '../PaymentProto/PaymentRequestDTO';
import type { PaymentResponseDTO as _PaymentProto_PaymentResponseDTO, PaymentResponseDTO__Output as _PaymentProto_PaymentResponseDTO__Output } from '../PaymentProto/PaymentResponseDTO';

export interface PaymentServiceClient extends grpc.Client {
  getAllPayments(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_PaymentProto_AllPaymentsResponseDTO__Output>): grpc.ClientUnaryCall;
  getAllPayments(argument: _google_protobuf_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_PaymentProto_AllPaymentsResponseDTO__Output>): grpc.ClientUnaryCall;
  getAllPayments(argument: _google_protobuf_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_PaymentProto_AllPaymentsResponseDTO__Output>): grpc.ClientUnaryCall;
  getAllPayments(argument: _google_protobuf_Empty, callback: grpc.requestCallback<_PaymentProto_AllPaymentsResponseDTO__Output>): grpc.ClientUnaryCall;
  
  makePayment(argument: _PaymentProto_PaymentRequestDTO, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_PaymentProto_PaymentResponseDTO__Output>): grpc.ClientUnaryCall;
  makePayment(argument: _PaymentProto_PaymentRequestDTO, metadata: grpc.Metadata, callback: grpc.requestCallback<_PaymentProto_PaymentResponseDTO__Output>): grpc.ClientUnaryCall;
  makePayment(argument: _PaymentProto_PaymentRequestDTO, options: grpc.CallOptions, callback: grpc.requestCallback<_PaymentProto_PaymentResponseDTO__Output>): grpc.ClientUnaryCall;
  makePayment(argument: _PaymentProto_PaymentRequestDTO, callback: grpc.requestCallback<_PaymentProto_PaymentResponseDTO__Output>): grpc.ClientUnaryCall;
  
}

export interface PaymentServiceHandlers extends grpc.UntypedServiceImplementation {
  getAllPayments: grpc.handleUnaryCall<_google_protobuf_Empty__Output, _PaymentProto_AllPaymentsResponseDTO>;
  
  makePayment: grpc.handleUnaryCall<_PaymentProto_PaymentRequestDTO__Output, _PaymentProto_PaymentResponseDTO>;
  
}

export interface PaymentServiceDefinition extends grpc.ServiceDefinition {
  getAllPayments: MethodDefinition<_google_protobuf_Empty, _PaymentProto_AllPaymentsResponseDTO, _google_protobuf_Empty__Output, _PaymentProto_AllPaymentsResponseDTO__Output>
  makePayment: MethodDefinition<_PaymentProto_PaymentRequestDTO, _PaymentProto_PaymentResponseDTO, _PaymentProto_PaymentRequestDTO__Output, _PaymentProto_PaymentResponseDTO__Output>
}
