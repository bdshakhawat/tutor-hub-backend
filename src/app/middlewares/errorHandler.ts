/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import config from '../../config';
import ApiError from '../../errors/statuscodeError';
import handleValidationError from '../../errors/validationError'; 
import { ZodError } from 'zod';
import handleMongooseError from '../../errors/mongooseError';
import handleZodError from '../../errors/zodError';
import { ICommonErrorMessage } from '../../types/errorType';

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  config.env === 'development'
    ? console.log(`🐱‍🏍 globalErrorHandler ~~`, { error })
    : console.log(`🐱‍🏍 globalErrorHandler ~~`, error);

  let statusCode = 500;
  let message = 'Something went wrong !';
  let errorMessages: ICommonErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleMongooseError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
};

export default globalErrorHandler;


// import { ErrorRequestHandler, Request, Response } from 'express';
// import config from '../../config';
// import ApiError from '../../errors/statuscodeError';
// import handleValidationError from '../../errors/validationError';
// import { ZodError } from 'zod';
// import handleMongooseError from '../../errors/mongooseError';
// import handleZodError from '../../errors/zodError';
// import { ICommonErrorMessage } from '../../types/errorType';
// import mongoose from 'mongoose';

// type StatusErrorResponse = {
//   statusCode: number;
//   message: string;
//   errorMessages: ICommonErrorMessage[];
// };

// type OtherErrors = 
//   | ZodError
//   | mongoose.Error.ValidationError
//   | mongoose.Error.CastError
//   | mongoose.Error
//   | ApiError
//   | Error
//   | { name: string; [key: string]: unknown };

// const handleErrorLogger = (error: OtherErrors): void => {
//   const logMessage = config.env === 'development' 
//     ? { error } 
//     : error;
//   console.error('[allErrorHandler]', logMessage);
// };

// const initiateErrorResponse = (): StatusErrorResponse => ({
//   statusCode: 500,
//   message: 'Something went wrong!',
//   errorMessages: [],
// });

// const validatingError = (error: OtherErrors): error is mongoose.Error.ValidationError => {
//   return error instanceof mongoose.Error && error.name === 'ValidationError';
// };

// const isCastError = (error: OtherErrors): error is mongoose.Error.CastError => {
//   return error instanceof mongoose.Error && error.name === 'CastError';
// };

// const handleSpecificErrors = (error: OtherErrors): StatusErrorResponse | null => {
//   if (validatingError(error)) {
//     return handleValidationError(error);
//   }
//   if (error instanceof ZodError) {
//     return handleZodError(error);
//   }
//   if (isCastError(error)) {
//     return handleMongooseError(error);
//   }
//   if (error instanceof ApiError) {
//     return {
//       statusCode: error.statusCode,
//       message: error.message,
//       errorMessages: error.message ? [{ path: '', message: error.message }] : [],
//     };
//   }
//   if (error instanceof Error) {
//     return {
//       statusCode: 500,
//       message: error.message,
//       errorMessages: error.message ? [{ path: '', message: error.message }] : [],
//     };
//   }
//   return null;
// };

// const allErrorHandler: ErrorRequestHandler = (
//   error: OtherErrors,
//   req: Request,
//   res: Response
// ) => {
//   handleErrorLogger(error);

//   const response = handleSpecificErrors(error) || initiateErrorResponse();

//   res.status(response.statusCode).json({
//     success: false,
//     message: response.message,
//     errorMessages: response.errorMessages,
//     stack: config.env !== 'production' ? error?.stack : undefined,
//   });
// };

// export default allErrorHandler;

