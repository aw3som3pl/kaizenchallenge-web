import {InewComment} from './interfaces/inew-comment';

export class NewComment implements InewComment{

  message: string;
  submissionId: number;

  constructor(message: string, submissionId: number) {
    this.message = message;
    this.submissionId = submissionId;
  }

}
