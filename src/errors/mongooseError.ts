import mongoose from 'mongoose';
import { ICommonErrorMessage } from '../types/errorType';

const handleMongooseError = (error: mongoose.Error.CastError) => {
  const errors: ICommonErrorMessage[] = [
    {
      path: error.path,
      message: 'Invalid Id',
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Cast Error',
    errorMessages: errors,
  };
};

export default handleMongooseError;
