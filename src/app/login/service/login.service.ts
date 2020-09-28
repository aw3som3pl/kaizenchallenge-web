import { Injectable } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private authService: AuthService) { }

  preformLoginAttempt(login: string, password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.authService.loginWithCredentials(login, password)
        .then(success => {
            resolve(success);
          },
          failure => {
            console.log(JSON.parse(failure));
            reject(failure);
          });
    });
  }
}
