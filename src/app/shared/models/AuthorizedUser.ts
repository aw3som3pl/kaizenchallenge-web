import {Role} from '../enums/role.enum';

export class AuthorizedUser {
  name: string;
  surname: string;
  email: string;
  thumbnailUrl: string;
  role: Role;
}
