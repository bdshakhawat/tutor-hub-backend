import mongoose from 'mongoose';
import { ICommonErrorResponse } from '../types/metaType';
import { ICommonErrorMessage } from '../types/errorType';

const handleValidationError = (
  error: mongoose.Error.ValidationError
): ICommonErrorResponse => {
  const errors: ICommonErrorMessage[] = Object.values(error.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleValidationError;
