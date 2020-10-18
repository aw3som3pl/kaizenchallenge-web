import {Ireview} from './interfaces/ireview';


export class NewReview{

  public reviewMessage: string;
  public reviewStatus: number;
  public nextReviewerId: number | null;
  public submissionId: number;
  public editorId: number;

  constructor(reviewMessage: string, reviewStatus: number, nextReviewerId: number | null, submissionId: number, editorId: number) {
    this.reviewMessage = reviewMessage;
    this.reviewStatus = reviewStatus;
    this.nextReviewerId = nextReviewerId;
    this.submissionId = submissionId;
    this.editorId = editorId;
  }

}
