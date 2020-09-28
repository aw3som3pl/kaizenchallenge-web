import {Ireviewer} from '../../interfaces/ireviewer';

export interface IreviewerResponse {
  reviewerCount: number;
  reviewers: [Ireviewer];
}
