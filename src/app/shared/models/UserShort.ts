
import {IuserShort} from './interfaces/iuserShort';

export class UserShort implements IuserShort{

  areas: [];
  id: number;
  employeeId: string;
  name: string;
  role: number;
  state: string;
  created: string;
  experience: number;
  lastLogon: string;
  email: string;

  constructor(init?: Partial<UserShort>) {
    Object.assign(this, init);
  }
}
