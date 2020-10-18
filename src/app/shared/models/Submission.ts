import {IapiError} from './interfaces/iapi-error';
import {IsubmissionContent} from './interfaces/isubmission-content';
import {IsubmissionHistory} from './interfaces/isubmission-history';
import {Isubmission} from './interfaces/isubmission';

export class Submission implements Isubmission{

  area: [];
  attachmentsCount: number;
  authorId: number;
  authorExp: number;
  authorName: string;
  category: number;
  commentCount: number;
  likeCount: number;
  reviewCount: number;
  status: number;
  submissionId: number;
  timestampCreated: string;
  topic: string;
  type: number;
}
