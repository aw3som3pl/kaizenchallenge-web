import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';
import {SessionService} from '../services/session.service';
import {take} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate, CanActivateChild {

  constructor(public afAuth: AngularFireAuth,
              public sessionService: SessionService,
              public router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUserAuth().then(valid => {
        if (state.url === '') {
          this.router.navigate(['authenticated/submission']);
        } else {
          return true;
        }
      },
      invalid => {
        this.router.navigate(['login']);
        return false;
      });
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUserAuth().then(valid => {
        if (state.url === '') {
          this.router.navigate(['authenticated/submission']);
        } else {
          return true;
        }
      },
      invalid => {
        this.router.navigate(['login']);
        return false;
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
}
