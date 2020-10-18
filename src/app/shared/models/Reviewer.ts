import {IuserFull} from './interfaces/iuserFull';
import {Ireviewer} from './interfaces/ireviewer';

export class Reviewer implements Ireviewer{

  reviewerArea: [] | null;
  reviewerExp: number | null;
  reviewerId: number;
  reviewerName: string;
  reviewerRole: number | null;

  constructor(reviewerArea: [], reviewerExp: number, reviewerId: number, reviewerName: string, reviewerRole: number) {
    this.reviewerArea = reviewerArea;
    this.reviewerExp = reviewerExp;
    this.reviewerId = reviewerId;
    this.reviewerName = reviewerName;
    this.reviewerRole = reviewerRole;
  }

}
