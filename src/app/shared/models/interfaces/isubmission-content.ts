import {IsubmissionHistory} from './isubmission-history';

export interface IsubmissionContent {
  submissionId: number;
  type: number;
  authorId: number;
  authorEmployeeId: string;
  authorName: string;
  status: number;
  category: number;
  areas: [];
  topic: string;
  description: string;
  additional: string;
  additionalValue: number;
  additionalUnit: number;
  currentReviewerName: string;
  currentReviewerRole: number;
  currentReviewerId: number;
  currentReviewerEmployeeId: string;
  history: [IsubmissionHistory];
  timestampCreated: string;
  likeCount: number;
  commentCount: number;
  reviewCount: number;
  attachmentsCount: number;
  editor: number;
  editorRole: number;
  editorName: string;
  editorEmployeeId: string;
  isLiked: boolean;
}
