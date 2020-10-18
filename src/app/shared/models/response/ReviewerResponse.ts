import {IreviewerResponse} from './interfaces/ireviewer-response';
import {Ireviewer} from '../interfaces/ireviewer';

export class ReviewerResponse implements IreviewerResponse{

  reviewerCount: number;
  reviewers: [Ireviewer];

  constructor(init?: Partial<ReviewerResponse>) {
    Object.assign(this, init);
  }


}
