import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {IuserFull} from '../../../../../shared/models/interfaces/iuserFull';
import {IuserShort} from '../../../../../shared/models/interfaces/iuserShort';
import {projectConfig} from '../../../../../../config/project-config';

@Injectable({
  providedIn: 'root'
})
export class UsersListingService {

  constructor(private http: HttpClient) { }

  loadUserOverallList(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get(`${projectConfig.apiBaseUrl}${environment.loadAllUsersDataEndpointURL}/${0}/${100}`)
        .subscribe( (data: [IuserShort]) => {
            resolve(data);
          },
          error => {
            reject(error);
          });
    });
  }
}
