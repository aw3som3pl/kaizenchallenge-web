import { Injectable } from '@angular/core';
import {SessionService} from './session.service';
import {Router} from '@angular/router';
import {IapiError} from '../models/interfaces/iapi-error';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor( private sessionService: SessionService,
               private router: Router) { }

  public handleAPIerror(error: IapiError){

  }

  public handleServerError(error: ErrorEvent){

  }

  public handleClientError(error: ErrorEvent){

  }

  private navigateToLogin(): void {
    this.router.navigate(['login']);
  }

}
