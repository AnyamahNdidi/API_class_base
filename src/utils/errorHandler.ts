import {
  Request,
  Response,
  // NextFunction
} from 'express';
import { MainAppError } from '@/utils/errorDefinition';
import { HTTP } from '@interfaces/error.interface';

const ErrorBuilder = (err: MainAppError, res: Response) => {
  res.status(HTTP.INTERNAL_SERVER_ERROR).json({
    name: err.name,
    message: err.message,
    status: err.status,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};

export const errorHandler = (
  err: MainAppError | Error,
  req: Request,
  res: Response
  // next: NextFunction
) => {
  if (err instanceof MainAppError) {
    ErrorBuilder(err, res);
  } else {
    res.status(HTTP.INTERNAL_SERVER_ERROR).json({
      name: err.name || 'Error',
      message: err.message || 'An unexpected error occurred',
      status: HTTP.INTERNAL_SERVER_ERROR,
      stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    });
  }
};
