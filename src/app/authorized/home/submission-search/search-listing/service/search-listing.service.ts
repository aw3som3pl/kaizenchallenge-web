import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SubmissionListingRequest} from '../../../../../shared/models/request/SubmissionListingRequest';
import {environment} from '../../../../../../environments/environment';
import {IsubmissionListingResponse} from '../../../../../shared/models/response/interfaces/isubmission-listing-response';

@Injectable({
  providedIn: 'root'
})
export class SearchListingService {

  constructor(private http: HttpClient) { }

  loadSubmissionsList(body: SubmissionListingRequest): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post(environment.loadFilteredSubmissionsListDataEndpointURL, body)
        .subscribe( (data: [IsubmissionListingResponse]) => {
            resolve(data);
          },
          error => {
            reject(error);
          });
    });
  }
}
