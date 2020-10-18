import {IlikeActionRequest} from './interfaces/ilike-action-request';
import {IlikesRequest} from './interfaces/ilikes-request';


export class LikesRequest implements IlikesRequest{

  batchSize: number;
  startIndex: number;
  submissionId: number;

  constructor(batchSize: number, startIndex: number, submissionId: number) {
    this.batchSize = batchSize;
    this.startIndex = startIndex;
    this.submissionId = submissionId;
  }



}
