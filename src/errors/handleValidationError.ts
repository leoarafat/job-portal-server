import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';

const handleValidationError = (error: any): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
    (el: any | any) => {
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
