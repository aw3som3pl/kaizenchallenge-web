import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {IuserShort} from '../../../../../shared/models/interfaces/iuserShort';
import {projectConfig} from '../../../../../../config/project-config';
import {IusersListingRequest} from '../../../../../shared/models/request/interfaces/iusers-listing-request';
import {IusersListingResponse} from '../../../../../shared/models/response/interfaces/iusers-listing-response';
import {EaccountStateEnum} from '../../../../../shared/enums/EaccountState.enum';

@Injectable({
  providedIn: 'root'
})
export class UsersListingService {

  constructor(private http: HttpClient) { }

  loadUserOverallList(request: IusersListingRequest): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post(`${projectConfig.apiBaseUrl}${environment.loadAllUsersDataEndpointURL}`, request)
        .subscribe( (data: IusersListingResponse) => {
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
