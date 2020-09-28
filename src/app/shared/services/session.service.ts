import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import * as firebase from 'firebase';
import {environment} from '../../../environments/environment';
import {IauthorizedUser} from '../models/interfaces/iauthorized-user';
import {AuthorizedUser} from '../models/AuthorizedUser';
import {AutocompleteHarnessFilters} from '@angular/material/autocomplete/testing';
import {User} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private _user: firebase.User;

  private authorizedUser: AuthorizedUser;

  constructor(private afAuth: AngularFireAuth,
              private authService: AuthService,
              private http: HttpClient) {

                afAuth.authState
                  .subscribe((user: User | null) => {
                    if (user) {
                      this._user = user;
                      this.fetchNewIdToken().then( idToken => {
                      });
                    } else {  // Jakimś cudem nie załapało usera
                      this.removeUserIdToken();
                    }
                  },
                err => {  // Błąd połączenia z Firebase
                  this.removeUserIdToken();
                }
              );
  }

  fetchNewIdToken(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this._user.getIdToken(true)
        .then((newToken: string) => {
            this.persistUserIdToken(newToken);
            this.downloadUserData().then((userData: IauthorizedUser) => {
                this.persistUserData(userData);
                resolve(newToken);  // Przekazujemy tokena tylko jak uda się odczytać dane z bazy
              },
              error => {
                reject(error);    // Jeśli baza wywaliła to wracamy do loginu
              });
          },
          error => {
            reject(error);  // Błąd połączenia z FIrebase
          });
    });
  }

  downloadUserData(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get(environment.fetchUserDataEndpointURL)
        .subscribe( (data: IauthorizedUser) => {
            resolve(data);
          },
          error => {
            reject(error);
          });
    });
  }

  getUserData(): AuthorizedUser {
    this.authorizedUser = new AuthorizedUser(JSON.parse(sessionStorage.getItem('userData')));
    return this.authorizedUser;
  }

  getUserRole(): number {
    return this.authorizedUser.role;
  }

  getUserAreas(): number[] {
    return this.authorizedUser.areas;
  }

  persistUserData(user: AuthorizedUser): void {
    this.authorizedUser = user;
    sessionStorage.setItem('userData', JSON.stringify(user));
  }

  removeUserData(): void {
    sessionStorage.removeItem('userData');
  }

  getUserIdToken(): string {
    return sessionStorage.getItem('idt');
  }

  persistUserIdToken(idToken: string){
    sessionStorage.setItem('idt', idToken);
  }

  removeUserIdToken(){
    sessionStorage.removeItem('idt');
  }

}
