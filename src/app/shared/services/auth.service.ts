import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import Persistence = firebase.auth.Auth.Persistence;

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
      this.afAuth.setPersistence(Persistence.SESSION)
        .then( success => {
          this.afAuth.signInWithEmailAndPassword(email, password)
            .then(response => {
              resolve(response);
            }, error => {
              reject(error);
            });
        }, failure => {});

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
