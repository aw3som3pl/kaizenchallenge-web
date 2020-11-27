import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import Persistence = firebase.auth.Auth.Persistence;
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router) {
  }

  loginWithCredentials(email: string, password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.setPersistence(Persistence.LOCAL)
        .then( success => {
          this.afAuth.signInWithEmailAndPassword(email, password)
            .then(response => {
              resolve(response);
            }, error => {
              reject(error);
            });
        }, failure => {
          reject(failure);
        });

    });
  }

  checkUserAuth(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.afAuth.authState.pipe(take(1)).subscribe(userAuthState => {
        if (userAuthState) {
          resolve(true);
        } else {
          reject(false);
        }
      }, invalidRequest => {
        reject(false);
      });
    });
  }

  logout(): Promise<any> {
    return new Promise<any>(((resolve, reject) => {
      this.afAuth.signOut().then(
        response => {
        resolve(response);
      },
        error => {
        reject(error);
        });
    }));
  }

}
