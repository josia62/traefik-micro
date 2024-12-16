import type * as grpc from "@grpc/grpc-js";
import * as grpcValue from "@grpc/grpc-js";

export const handleGrpcError = (
  callback: grpc.sendUnaryData<any>,
  error: string | Error,
  code: grpc.status.INTERNAL = grpcValue.status.INTERNAL,
) => {
  callback(
    {
      code: code,
      message: typeof error === "string" ? error : error?.message,
    },
    null,
  );
};
