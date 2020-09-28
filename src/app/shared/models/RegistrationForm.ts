import {IRegistrationForm} from './interfaces/iregistration-form';

export class RegistrationForm implements IRegistrationForm{
  public name: string;
  public surname: string;
  public email: string;
  public password: string;
  public employeeID: string;
  public role: number;
  public areas: [number];

  constructor(init?: Partial<RegistrationForm>) {
    Object.assign(this, init);
  }
}
