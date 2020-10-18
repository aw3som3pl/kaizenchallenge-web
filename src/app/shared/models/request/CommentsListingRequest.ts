import {IcommentsListingRequest} from './interfaces/icomments-listing-request';


export class CommentsListingRequest implements IcommentsListingRequest{

  batchSize: number;
  startIndex: number;
  submissionId: number;

  constructor(batchSize: number, startIndex: number, submissionId: number) {
    this.batchSize = batchSize;
    this.startIndex = startIndex;
    this.submissionId = submissionId;
  }

}
