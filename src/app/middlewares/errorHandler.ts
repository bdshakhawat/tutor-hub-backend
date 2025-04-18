

import { ErrorRequestHandler, Request, Response } from 'express';
import config from '../../config';
import ApiError from '../../errors/statuscodeError';
import handleValidationError from '../../errors/validationError';
import { ZodError } from 'zod';
import handleCastError from '../../errors/mongooseError';
import handleZodError from '../../errors/zodError';
import { IGenericErrorMessage } from '../../types/error';
import mongoose from 'mongoose';

type ErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

type PossibleErrors = 
  | ZodError
  | mongoose.Error.ValidationError
  | mongoose.Error.CastError
  | mongoose.Error
  | ApiError
  | Error
  | { name: string; [key: string]: unknown };

const errorLogger = (error: PossibleErrors): void => {
  const logMessage = config.env === 'development' 
    ? { error } 
    : error;
  console.error('[GlobalErrorHandler]', logMessage);
};

const initializeErrorResponse = (): ErrorResponse => ({
  statusCode: 500,
  message: 'Something went wrong!',
  errorMessages: [],
});

const isValidationError = (error: PossibleErrors): error is mongoose.Error.ValidationError => {
  return error instanceof mongoose.Error && error.name === 'ValidationError';
};

const isCastError = (error: PossibleErrors): error is mongoose.Error.CastError => {
  return error instanceof mongoose.Error && error.name === 'CastError';
};

const handleSpecificErrors = (error: PossibleErrors): ErrorResponse | null => {
  if (isValidationError(error)) {
    return handleValidationError(error);
  }
  if (error instanceof ZodError) {
    return handleZodError(error);
  }
  if (isCastError(error)) {
    return handleCastError(error);
  }
  if (error instanceof ApiError) {
    return {
      statusCode: error.statusCode,
      message: error.message,
      errorMessages: error.message ? [{ path: '', message: error.message }] : [],
    };
  }
  if (error instanceof Error) {
    return {
      statusCode: 500,
      message: error.message,
      errorMessages: error.message ? [{ path: '', message: error.message }] : [],
    };
  }
  return null;
};

const globalErrorHandler: ErrorRequestHandler = (
  error: PossibleErrors,
  req: Request,
  res: Response
) => {
  errorLogger(error);

  const response = handleSpecificErrors(error) || initializeErrorResponse();

  res.status(response.statusCode).json({
    success: false,
    message: response.message,
    errorMessages: response.errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
};

export default globalErrorHandler;

