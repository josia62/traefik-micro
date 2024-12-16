import { HttpStatus } from "../../data/constants/http-status";
import type { NextFunction, Request, Response } from "express";

export class Exception extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const exceptionHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    const { statusCode, message } = err;
    res.status(statusCode || HttpStatus.INTERNAL_SERVER_ERROR).send({ message: message, isError: true, data: null });
  } else {
    next();
  }
};
