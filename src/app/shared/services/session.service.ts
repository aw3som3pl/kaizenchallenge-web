import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import * as firebase from 'firebase';
import {environment} from '../../../environments/environment';
import {IuserFull} from '../models/interfaces/iuserFull';
import {UserFull} from '../models/UserFull';
import {User} from 'firebase';
import {Router} from '@angular/router';
import {InotificationsListingResponse} from '../models/response/interfaces/inotifications-listing-response';
import {projectConfig} from '../../../config/project-config';
import {EaccountStateEnum} from '../enums/EaccountState.enum';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private _user: firebase.User;

  private authorizedUser: UserFull;

  constructor(private afAuth: AngularFireAuth,
              private authService: AuthService,
              private http: HttpClient,
              private router: Router) {

                afAuth.authState  // Działa tylko przy loginie / logoucie
                  .subscribe((user: User | null) => {
                    if (user) {
                      this._user = user;
                      this.fetchNewIdToken();
                    } else {
                      this.navigateToLogin();
                    }
                  },
                err => {
                  this.navigateToLogin();
                }
              );
  }

  fetchNewIdToken(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this._user.getIdToken(true)
        .then((newToken: string) => {
            this.persistUserIdToken(newToken);
            this.reloadUserData().then((userData: IuserFull) => {
                this.persistUserData(userData);
                resolve(userData);  // Przekazujemy tokena tylko jak uda się odczytać dane z bazy
              },
              error => {
                reject(error);    // Jeśli baza wywaliła to wracamy do loginu
                this.navigateToLogin();
              });
          },
          error => {
            this.navigateToLogin();
            reject(error);  // Błąd połączenia z FIrebase
          });
    });
  }

  reloadUserData(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get(`${projectConfig.apiBaseUrl}${environment.fetchUserDataEndpointURL}`)
        .subscribe( (data: IuserFull) => {
            resolve(data);
          },
          error => {
            reject(error);
          });
    });
  }

  updateUnreadNotificationsCount(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (this.getUserIdToken()) {
      this.http.get(`${projectConfig.apiBaseUrl}${environment.updateUnreadNotificationsCountEndpointURL}`)
        .subscribe( (data: number) => {
            resolve(data);
          },
          error => {
            reject(error);
          });
      } else {
        resolve(0);
      }
    });
  }

  getActiveNotificationsList(startIndex: number, batchSize: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get(`${projectConfig.apiBaseUrl}${environment.getActiveNotificationsCountEndpointURL}/${startIndex}/${batchSize}`)
        .subscribe( (data: [InotificationsListingResponse]) => {
            resolve(data);
          },
          error => {
            reject(error);
          });
    });
  }

  markNotificationsAsRead(notificationIds: number[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post(`${projectConfig.apiBaseUrl}${environment.markNotificationsAsReadEndpointURL}`, JSON.stringify(notificationIds))
        .subscribe( (data: boolean) => {
            resolve(data);
          },
          error => {
            reject(error);
          });
    });
  }

  loadEligibleAreas(): any {

    const userState = this.getUserState();
    const s = EaccountStateEnum;

    switch (userState) {
      case s.ACTIVE:
        return null;
      case s.TEST:
        return this.getUserAreas();
    }
  }

  getUserData(): UserFull {
    this.authorizedUser = new UserFull(JSON.parse(localStorage.getItem('userData')));
    return this.authorizedUser;
  }

  getUserId(): number {
    return this.authorizedUser.uId;
  }

  getEmployeeId(): string {
    return this.authorizedUser.employeeId;
  }

  getUserRole(): number {
    return this.authorizedUser.role;
  }

  getUserState(): string {
    return this.authorizedUser.state;
  }

  getUserAreas(): number[] {
    return this.authorizedUser.areas;
  }

  getUserExp(): number {
    return this.authorizedUser.experience;
  }

  getUserActiveNotificationsCount(): number {
    return this.authorizedUser ? this.authorizedUser.activeNotificationsCount : 0;
  }

  persistUserData(user: UserFull): void {
    this.authorizedUser = user;
    localStorage.setItem('userData', JSON.stringify(user));
  }

  removeUserData(): void {
    localStorage.removeItem('userData');
  }

  getUserIdToken(): string {
    return localStorage.getItem('idt');
  }

  persistUserIdToken(idToken: string){
    localStorage.setItem('idt', idToken);
  }

  removeUserIdToken(){
    localStorage.removeItem('idt');
  }

  checkAdminPrivilege(): boolean {
    return this.authorizedUser ? this.authorizedUser.role > 3 : false;
  }

  checkSysAdminPrivilege(): boolean {
    return this.authorizedUser ? this.authorizedUser.role > 4 : false;
  }

  checkTestStatusActive(): boolean {
    return this.authorizedUser ? this.authorizedUser.state === 'T' : false;
  }

  navigateToLogin(): void {
    this.removeUserIdToken();
    this.removeUserData();
    this.router.navigate(['login']);
  }

}
