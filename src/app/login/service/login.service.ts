import { Injectable } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private authService: AuthService) { }

  preformLoginAttempt(login: string, password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.authService.loginWithCredentials(login, password)
        .then(success => {
            console.log(success.toString());
            resolve(success);
          },
          failure => {
            console.log(failure.toString());
            reject(failure);
          });
    });
  }
}
