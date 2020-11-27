import {UserUpdateRequest} from '../request/UserUpdateRequest';

export class UserDataUpdate {

  public userFormValid: boolean;
  public payload: UserUpdateRequest | null;

  constructor(userFormValid: boolean, payload: UserUpdateRequest | null) {
    this.userFormValid = userFormValid;
    this.payload = payload;
  }
}
