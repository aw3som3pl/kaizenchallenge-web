import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {catchError, retry, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {RegistrationForm} from '../../../shared/models/RegistrationForm';
import {projectConfig} from '../../../../config/project-config';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) {
  }

  preformRegistrationAttempt(registrationForm: RegistrationForm): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post(`${projectConfig.apiBaseUrl}${environment.registerUserEndpointURL}`, JSON.stringify(registrationForm))
        .subscribe( data => {
            console.log(JSON.stringify(data));
            resolve(data);
          },
            error => {
              console.log(error.message);
              reject(error);
            });
    });
  }
}
