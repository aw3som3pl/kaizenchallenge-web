import {IlikeActionRequest} from './interfaces/ilike-action-request';


export class LikeActionRequest implements IlikeActionRequest{

  likeAction: boolean;
  submissionId: number;

  constructor(likeAction: boolean, submissionId: number) {
    this.likeAction = likeAction;
    this.submissionId = submissionId;
  }


}
