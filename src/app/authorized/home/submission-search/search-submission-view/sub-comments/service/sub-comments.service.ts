import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommentsListingRequest} from '../../../../../../shared/models/request/CommentsListingRequest';
import {environment} from '../../../../../../../environments/environment';
import {IcommentsListingResponse} from '../../../../../../shared/models/response/interfaces/icomments-listing-response';
import {NewComment} from '../../../../../../shared/models/NewComment';
import {InewCommentResponse} from '../../../../../../shared/models/response/interfaces/inew-comment-response';
import {projectConfig} from '../../../../../../../config/project-config';

@Injectable({
  providedIn: 'root'
})
export class SubCommentsService {

  constructor(private http: HttpClient) {}

  getCommentsList(commentsListingRequest: CommentsListingRequest): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post(`${projectConfig.apiBaseUrl}${environment.loadSubmissionCommentsEndpointURL}`,
        JSON.stringify(commentsListingRequest))
        .subscribe( (data: IcommentsListingResponse) => {
            console.log(JSON.stringify(data));
            resolve(data);
          },
          error => {
            reject(error);
          });
    });
  }

  sendNewComment(newComment: NewComment): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post(`${projectConfig.apiBaseUrl}${environment.sendNewCommentEndpointURL}`,
        JSON.stringify(newComment))
        .subscribe( (data: InewCommentResponse) => {
            console.log(JSON.stringify(data));
            resolve(data);
          },
          error => {
            reject(error);
          });
    });
  }

}
