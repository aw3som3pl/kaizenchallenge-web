import {IapiError} from './interfaces/iapi-error';
import {IsubmissionContent} from './interfaces/isubmission-content';
import {IsubmissionHistory} from './interfaces/isubmission-history';

export class SubmissionContent implements IsubmissionContent{

  additional: string;
  additionalUnit: number;
  additionalValue: number;
  areas: [];
  attachmentsCount: number;
  authorId: number;
  authorEmployeeId: string;
  authorName: string;
  category: number;
  commentCount: number;
  currentReviewerName: string;
  currentReviewerRole: number;
  description: string;
  history: [IsubmissionHistory];
  likeCount: number;
  reviewCount: number;
  status: number;
  submissionId: number;
  timestampCreated: string;
  topic: string;
  type: number;
  editor: number;
  editorRole: number;
  editorName: string;
  currentReviewerId: number;
  editorEmployeeId: string;
  currentReviewerEmployeeId: string;
  isLiked: boolean;

}
