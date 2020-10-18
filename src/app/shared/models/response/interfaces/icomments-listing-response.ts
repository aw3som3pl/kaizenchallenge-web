import {Icomment} from '../../interfaces/icomment';

export interface IcommentsListingResponse {
 comments: [Icomment];
 commentCount: number;
}
