import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {projectConfig} from '../../../../../../config/project-config';
import {IusersListingRequest} from '../../../../../shared/models/request/interfaces/iusers-listing-request';
import {IusersListingResponse} from '../../../../../shared/models/response/interfaces/iusers-listing-response';

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
}
