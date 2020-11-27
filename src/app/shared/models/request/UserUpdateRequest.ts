
import {IusersListingRequest} from './interfaces/iusers-listing-request';
import {IuserUpdateRequest} from './interfaces/iuser-update-request';

export class UserUpdateRequest implements IuserUpdateRequest{

  id: number;
  employeeId: string;
  name: string;
  surname: string;
  thumbnailUrl: '';
  experience: number;
  role: number;
  areas: number[];
  state: string;

  constructor(init?: Partial<UserUpdateRequest>) {
    Object.assign(this, init);
  }
}
