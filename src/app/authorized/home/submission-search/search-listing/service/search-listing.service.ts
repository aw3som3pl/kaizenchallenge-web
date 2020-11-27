import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SubmissionListingRequest} from '../../../../../shared/models/request/SubmissionListingRequest';
import {environment} from '../../../../../../environments/environment';
import {IsubmissionListingResponse} from '../../../../../shared/models/response/interfaces/isubmission-listing-response';
import {projectConfig} from '../../../../../../config/project-config';
import {EaccountStateEnum} from '../../../../../shared/enums/EaccountState.enum';
import {SessionService} from '../../../../../shared/services/session.service';

@Injectable({
  providedIn: 'root'
})
export class SearchListingService {

  constructor(private http: HttpClient) { }

  loadSubmissionsList(body: SubmissionListingRequest): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post(`${projectConfig.apiBaseUrl}${environment.loadFilteredSubmissionsListDataEndpointURL}`, body)
        .subscribe( (data: [IsubmissionListingResponse]) => {
            resolve(data);
          },
          error => {
            reject(error);
          });
    });
  }

  loadEligibleAreas(accountState: string, accountBoundAreas: number[]): any {

    const s = EaccountStateEnum;

    switch (accountState) {
      case s.ACTIVE:
        return null;
      case s.TEST:
        return accountBoundAreas;
    }
  }
}
