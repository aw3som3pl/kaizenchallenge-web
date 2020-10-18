import { Injectable } from '@angular/core';
import {RegistrationForm} from '../../../../shared/models/RegistrationForm';
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ReviewerRequest} from '../../../../shared/models/request/ReviewerRequest';
import {IreviewerResponse} from '../../../../shared/models/response/interfaces/ireviewer-response';
import {EuploadAction} from '../../../../shared/enums/Eupload-action.enum';
import {FormGroup} from '@angular/forms';
import {NewSubmission} from '../../../../shared/models/NewSubmission';
import {InewSubmissionResponse} from '../../../../shared/models/response/interfaces/inew-submission-response';
import {projectConfig} from '../../../../../config/project-config';

@Injectable({
  providedIn: 'root'
})
export class CreateSubmissionService {

  constructor(private http: HttpClient) { }

  getReviewersList(searchParams: ReviewerRequest): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post(`${projectConfig.apiBaseUrl}${environment.getReviewerListEndpointURL}`, JSON.stringify(searchParams))
        .subscribe( (data: IreviewerResponse) => {
            console.log(JSON.stringify(data));
            resolve(data);
          },
          error => {
            reject(error);
          });
    });
  }

  parseSubmissionForms(submissionType: number, step1Form: FormGroup, step2Form: FormGroup, attachmentsArray: string[]): NewSubmission {
    return new NewSubmission(
      step1Form.value.additional,
      step1Form.value.additionalUnit,
      step1Form.value.additionalValue,
      step1Form.value.areas,
      attachmentsArray,
      step1Form.value.category,
      step1Form.value.description,
      step2Form.value.reviewer.reviewerId,
      step1Form.value.topic,
      submissionType
    );
  }

  sendNewSubmissionData(newSubmission: NewSubmission): Promise<any> {
    console.log(JSON.stringify(newSubmission));
    return new Promise<any>((resolve, reject) => {
      this.http.post(`${projectConfig.apiBaseUrl}${environment.sendNewSubmissionEndpointURL}`, JSON.stringify(newSubmission))
        .subscribe( (data: InewSubmissionResponse) => {
            resolve(data);
          },
          error => {
            reject(error);
          });
    });
  }
}
