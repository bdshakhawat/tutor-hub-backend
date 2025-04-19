import { ICommonErrorMessage } from './errorType';

export type ICommonResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

export type ICommonErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: ICommonErrorMessage[];
};
