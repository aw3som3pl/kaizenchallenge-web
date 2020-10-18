
import {IuserShort} from './interfaces/iuserShort';

export class UserShort implements IuserShort{

  areas: [];
  id: number;
  name: string;
  role: number;

  constructor(init?: Partial<UserShort>) {
    Object.assign(this, init);
  }
}
