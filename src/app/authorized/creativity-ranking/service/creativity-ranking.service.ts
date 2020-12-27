import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {projectConfig} from '../../../../config/project-config';
import {HttpClient} from '@angular/common/http';
import {CreativityRankingListingRequest} from '../../../shared/models/request/CreativityRankingListingRequest';
import {IcreativityRankingListingResponse} from '../../../shared/models/response/interfaces/icreativity-ranking-listing-response';
import {SessionService} from '../../../shared/services/session.service';
import {Erole} from '../../../shared/enums/Erole.enum';
import {IsubmissionListingResponse} from '../../../shared/models/response/interfaces/isubmission-listing-response';
import {SubmissionListingRequest} from '../../../shared/models/request/SubmissionListingRequest';

@Injectable({
  providedIn: 'root'
})
export class CreativityRankingService {

  constructor(private http: HttpClient,
              private sessionService: SessionService) {
  }

  loadCreativityRankingList(body: CreativityRankingListingRequest): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post(`${projectConfig.apiBaseUrl}${environment.loadCreativityRankingListEndpointURL}`, body)
        .subscribe((data: IcreativityRankingListingResponse) => {
            resolve(this.dropSysAdminAccounts(data));
          },
          error => {
            reject(error);
          });
    });
  }

  prepareCreativityRankingRequest( batchSize: number, startIndex: number): CreativityRankingListingRequest {
    return new CreativityRankingListingRequest(batchSize, startIndex, this.sessionService.loadEligibleAreas());
  }

  dropSysAdminAccounts(payload: IcreativityRankingListingResponse): IcreativityRankingListingResponse{
    for ( let i = 0; i < payload.mostActiveUsers.length; i++){
      if (payload.mostActiveUsers[i].role === Erole.SYS_ADMIN){
        payload.mostActiveUsers.splice(i, 1);
      }
    }
    return payload;
  }

  loadMostActiveIdeasList(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post(`${projectConfig.apiBaseUrl}${environment.loadFilteredSubmissionsListDataEndpointURL}`, this.prepareMostActiveIdeasRequest())
        .subscribe( (data: IsubmissionListingResponse) => {
            resolve(data);
          },
          error => {
            reject(error);
          });
    });
  }

  loadMostActiveProblemsList(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post(`${projectConfig.apiBaseUrl}${environment.loadFilteredSubmissionsListDataEndpointURL}`, this.prepareMostActiveProblemsRequest())
        .subscribe( (data: IsubmissionListingResponse) => {
            resolve(data);
          },
          error => {
            reject(error);
          });
    });
  }

  prepareMostActiveIdeasRequest(): SubmissionListingRequest{
    const newRecentSubmissionsRequest = new SubmissionListingRequest(
      null,
      null,
      5,
      null,
      [1],
      0,
      null,
      new Date().toISOString(),
      null,
      [0],
      null);
    console.log(newRecentSubmissionsRequest);
    return newRecentSubmissionsRequest;
  }

  prepareMostActiveProblemsRequest(): SubmissionListingRequest{
    const newRecentSubmissionsRequest = new SubmissionListingRequest(
      null,
      null,
      5,
      null,
      [1],
      0,
      null,
      new Date().toISOString(),
      null,
      [1],
      null);
    console.log(newRecentSubmissionsRequest);
    return newRecentSubmissionsRequest;
  }


}
