import {IapiError} from './interfaces/iapi-error';

export class ApiError implements IapiError{
  ErrorCode: number;
  Message: string;

  constructor(init?: Partial<ApiError>) {
    Object.assign(this, init);
  }
}
