import { Injectable } from '@angular/core';
import {SubmissionListingRequest} from '../../../../../../shared/models/request/SubmissionListingRequest';
import {environment} from '../../../../../../../environments/environment';
import {IsubmissionListingResponse} from '../../../../../../shared/models/response/interfaces/isubmission-listing-response';
import {HttpClient} from '@angular/common/http';
import {projectConfig} from '../../../../../../../config/project-config';


@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) { }

  loadRecentSubmissionsList(employeeId: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post(`${projectConfig.apiBaseUrl}${environment.loadFilteredSubmissionsListDataEndpointURL}`, this.preparePersonalSubmissionsRequest(employeeId))
        .subscribe( (data: IsubmissionListingResponse) => {
            resolve(data);
          },
          error => {
            reject(error);
          });
    });
  }

  preparePersonalSubmissionsRequest(employeedId: string): SubmissionListingRequest{
    const newRecentSubmissionsRequest = new SubmissionListingRequest(
      null,
      null,
      5,
      null,
      null,
      0,
      null,
      new Date().toISOString(),
      null,
      null,
      employeedId);
    console.log(newRecentSubmissionsRequest);
    return newRecentSubmissionsRequest;
  }

}
