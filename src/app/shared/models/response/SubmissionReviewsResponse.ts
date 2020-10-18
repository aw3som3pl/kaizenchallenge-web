import {IreviewerResponse} from './interfaces/ireviewer-response';
import {Ireviewer} from '../interfaces/ireviewer';
import {IsubmissionReviewsResponse} from './interfaces/isubmission-reviews-response';
import {Ireview} from '../interfaces/ireview';

export class SubmissionReviewsResponse implements IsubmissionReviewsResponse{

  reviewCount: number;
  reviews: [Ireview];

  constructor(init?: Partial<SubmissionReviewsResponse>) {
    Object.assign(this, init);
  }


}
