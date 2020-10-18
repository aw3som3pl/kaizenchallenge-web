import {Icomment} from './interfaces/icomment';

export class Comment implements Icomment{

  authorExp: number;
  authorId: number;
  authorName: string;
  authorThumbnail: string;
  commentId: number;
  commentMesage: string;
  timestampUpdated: string;

}
