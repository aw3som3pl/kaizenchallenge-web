import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild} from '@angular/router';
import { Observable } from 'rxjs';
import {SessionService} from '../services/session.service';
import {take} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate, CanActivateChild {

  constructor(private afAuth: AngularFireAuth,
              private sessionService: SessionService,
              private authService: AuthService,
              private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.checkUserAuth().then(valid => {
        if (state.url === '') {
          this.router.navigate(['authenticated/home/create']);
        } else {
          return true;
        }
      },
      invalid => {
        if (invalid){
          this.router.navigate(['login']);
        }else{
          return false;
        }
      });
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.checkUserAuth().then(valid => {
        if (state.url === '') {
          this.router.navigate(['authenticated/home/create']);
        } else {
          return true;
        }
      },
      invalid => {
        this.router.navigate(['login']);
        return false;
      });
  }
}
