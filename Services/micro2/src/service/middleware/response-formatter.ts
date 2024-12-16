import { HttpStatus } from "../../data/constants/http-status";

export const responseFormatter = (req, res) => {
  const { statusCode = HttpStatus.OK, data, message = "" } = res.locals;

  res
    .status(data !== undefined && statusCode === HttpStatus.BAD_REQUEST ? HttpStatus.OK : statusCode)
    .json({ message, data, isError: false });
};
