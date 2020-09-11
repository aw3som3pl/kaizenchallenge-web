import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from './auth.service';
import {AuthorizedUser} from '../models/AuthorizedUser';
import * as firebase from 'firebase';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private _userIdToken: Promise<string>;

  private _currentUser: AuthorizedUser;
  private _currentUserAuthState: boolean;

  constructor(private afAuth: AngularFireAuth,
              private authService: AuthService) {
                afAuth.authState.subscribe(user => {
                    if (user) {
                      this._currentUserAuthState = true;
                      this._userIdToken = user.getIdToken(true);
                      console.log('NEW TOKEN: ' + this._userIdToken);
                    } else {
                      this._currentUserAuthState = false;
                      this._userIdToken = null;
                    }
                  },
                err => {
                  this._currentUserAuthState = false;
                  this._userIdToken = null;
                }
              );
  }

  checkUserAuth() {

  }

  fetchUserData(): void {}

  isUserAuthenticated(): boolean{
    return this._currentUserAuthState;
  }

  get currentUser(): AuthorizedUser {
    return this._currentUser;
  }
  get currentUserAuthState(): boolean {
    return this._currentUserAuthState;
  }
  get userIdToken(): Promise<string> {
    return this._userIdToken;
  }
}
