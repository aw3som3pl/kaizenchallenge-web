import {IreviewerRequest} from './interfaces/ireviewer-request';


export class ReviewerRequest implements IreviewerRequest{

  public area: number[];
  public role: number[];

  constructor(_area: number[], _role: number[]) {
    this.area = _area;
    this.role = _role;
  }

}
