import { Injectable } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {IsubmissionContent} from '../../../../../shared/models/interfaces/isubmission-content';
import {HttpClient} from '@angular/common/http';
import {SubmissionUpdate} from '../../../../../shared/models/SubmissionUpdate';
import {IsubmissionUpdateResponse} from '../../../../../shared/models/response/interfaces/isubmission-update-response';
import {SubmissionContent} from '../../../../../shared/models/SubmissionContent';
import {EsubmissionStatusEnum} from '../../../../../shared/enums/Esubmission-status.enum';
import {Erole} from '../../../../../shared/enums/Erole.enum';
import {SessionService} from '../../../../../shared/services/session.service';
import {LikeActionRequest} from '../../../../../shared/models/request/LikeActionRequest';
import {IlikeActionResponse} from '../../../../../shared/models/response/interfaces/ilike-action-response';
import {projectConfig} from '../../../../../../config/project-config';

@Injectable({
  providedIn: 'root'
})
export class SubmissionViewService {

  constructor(private http: HttpClient,
              private sessionService: SessionService) { }

  getSubmissionContents(submissionId: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get(`${projectConfig.apiBaseUrl}${environment.getSubmissionContentsEndpointURL}/${submissionId}`)
        .subscribe( (data: IsubmissionContent) => {
            resolve(data);
          },
          error => {
            reject(error);
          });
    });
  }

  sendSubmissionUpdateData( submissionUpdate: SubmissionUpdate): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post(`${projectConfig.apiBaseUrl}${environment.updateSubmissionDataEndpointURL}`,
        JSON.stringify(submissionUpdate))
        .subscribe( (data: IsubmissionUpdateResponse) => {
            resolve(data);
          },
          error => {
            reject(error);
          });
    });
  }

  sendSubmissionLike(request: LikeActionRequest){
    return new Promise<any>((resolve, reject) => {
      this.http.post(`${projectConfig.apiBaseUrl}${environment.sendNewLikeActionEndpointURL}`, request)
        .subscribe( (data: IlikeActionResponse) => {
            resolve(data);
          },
          error => {
            reject(error);
          });
    });
  }

  prepareSubmissionForUpdate(updatedSubmission: SubmissionContent, attachmentsURLs: string[] | null): SubmissionUpdate{
    return new SubmissionUpdate(
      updatedSubmission.additional,
      updatedSubmission.additionalUnit,
      updatedSubmission.additionalValue,
      updatedSubmission.areas,
      attachmentsURLs,
      updatedSubmission.category,
      updatedSubmission.description,
      updatedSubmission.submissionId,
      updatedSubmission.topic
    );
  }

  determineEditableState(currentSubmissionStatus: number, submissionEditorId: number): boolean{
    const s = EsubmissionStatusEnum;
    const r = Erole;
    console.log(this.sessionService.getUserRole());
    console.log(this.sessionService.getUserId());
    switch (this.sessionService.getUserRole()) {
      case r.SYS_ADMIN:
        return true;
      default:
        break;
    }

    switch (currentSubmissionStatus) {
      case s.DO_POPRAWY:
        return this.sessionService.getUserId() === submissionEditorId;
      default:
        return false;
    }
  }
}
