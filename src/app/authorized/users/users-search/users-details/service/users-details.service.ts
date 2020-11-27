import { Injectable } from '@angular/core';
import {projectConfig} from '../../../../../../config/project-config';
import {environment} from '../../../../../../environments/environment';
import {IuserFull} from '../../../../../shared/models/interfaces/iuserFull';
import {HttpClient} from '@angular/common/http';
import {SessionService} from '../../../../../shared/services/session.service';
import {UserUpdateRequest} from '../../../../../shared/models/request/UserUpdateRequest';
import {IuserUpdateResponse} from '../../../../../shared/models/response/interfaces/iuser-update-response';

@Injectable({
  providedIn: 'root'
})
export class UsersDetailsService {

  constructor(private http: HttpClient,
              private sessionService: SessionService) { }

  reloadUserData(userId: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get(`${projectConfig.apiBaseUrl}${environment.fetchEmployeeDataEndpointURL}/${userId}`)
        .subscribe( (data: IuserFull) => {
            resolve(data);
          },
          error => {
            reject(error);
          });
    });
  }

  uploadUserData(updatedUserData: UserUpdateRequest): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post(`${projectConfig.apiBaseUrl}${environment.updateUserDataEndpointURL}`, updatedUserData)
        .subscribe( (data: IuserUpdateResponse) => {
            resolve(data);
          },
          error => {
            reject(error);
          });
    });
  }

  checkUserEditable(): boolean {
    return this.sessionService.getUserRole() > 3;
  }
}
