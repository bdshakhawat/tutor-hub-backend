import { ZodError, ZodIssue } from 'zod';
import { ICommonErrorResponse } from '../types/metaType';
import { ICommonErrorMessage } from '../types/errorType';

const handleZodError = (error: ZodError): ICommonErrorResponse => {
  const errors: ICommonErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleZodError;
