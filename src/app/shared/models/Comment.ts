import {Icomment} from './interfaces/icomment';
import {UserFull} from './UserFull';
import {InewCommentResponse} from './response/interfaces/inew-comment-response';

export class Comment implements Icomment{

  authorExp: number;
  authorId: number;
  authorEmployeeId: string;
  authorName: string;
  authorThumbnail: string;
  commentId: number;
  commentMesage: string;
  timestampUpdated: string;

  getNewUserComment(currentUser: UserFull, newCommentMessage: string, newCommentMetadata: InewCommentResponse){
    this.authorExp = currentUser.experience;
    this.authorEmployeeId = currentUser.employeeId;
    this.authorId = currentUser.uId;
    this.authorName = `${currentUser.name} ${currentUser.surname}`;
    this.authorThumbnail = currentUser.thumbnailUrl;
    this.commentMesage = newCommentMessage;
    this.timestampUpdated = newCommentMetadata.timestampUpdated;
  }

}
