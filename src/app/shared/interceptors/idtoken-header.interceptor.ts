import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {SessionService} from '../services/session.service';
import {catchError, retry} from 'rxjs/operators';
import {EapiError} from '../enums/Eapi-error.enum';
import {IapiError} from '../models/interfaces/iapi-error';

@Injectable()
export class IdtokenHeaderInterceptor implements HttpInterceptor {

  constructor(private sessionService: SessionService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.sessionService.getUserIdToken()) {
      const authorizedRequest = request.clone({
        headers: request.headers
          .set('Authorization', this.sessionService.getUserIdToken())
          .set('Content-Type', 'application/json')
          .set('accept', 'text/plain')
      });
      return next.handle(authorizedRequest)
        .pipe(
          retry(1),
            catchError((error: HttpErrorResponse) => {

            let errorMessage = '';

            if (error.error instanceof ErrorEvent){ // CLIENT Errors
              errorMessage = `Error: ${error.error.message}`;
              return throwError(errorMessage);
            }
            if (error.error as IapiError){  // API Errors
              const apiError: IapiError = error.error as IapiError;
              errorMessage = `API Error:\nCode {${EapiError[apiError.ErrorCode]}}\nCause {${apiError.Message}}`;
              console.error(errorMessage);
              return throwError(errorMessage);
            } else { // Other Server Errors
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
              return throwError(errorMessage);
            }
            },
          )
        );
    }
    // Pass the cloned request instead of the original request to the next handle
    const unauthorizedRequest = request.clone({headers: request.headers.set('Content-Type', 'application/json')});
    return next.handle(unauthorizedRequest);
  }
}
