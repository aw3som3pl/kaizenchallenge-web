import {IauthorizedUser} from './interfaces/iauthorized-user';
import {Ireviewer} from './interfaces/ireviewer';

export class Reviewer implements Ireviewer{

  reviewerArea: [];
  reviewerExp: number;
  reviewerId: number;
  reviewerName: string;
  reviewerRole: number;

  constructor(init?: Partial<Reviewer>) {
    Object.assign(this, init);
  }

}
