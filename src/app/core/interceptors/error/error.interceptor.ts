import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpEventType,
} from '@angular/common/http';
import { catchError, finalize, Observable, retry, tap, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      finalize(() => {
        // this.spinner.hide();
      }),
      // tap((ev: HttpEvent<any>) => {
      //   if (
      //     ev.type == HttpEventType.Response &&
      //     ev.body &&
      //     ev.body.errors &&
      //     ev.body.errors.Any()
      //   ) {
      //     const message = ev.body.errors[0].extensions
      //       ? ev.body.errors[0].extensions.message
      //       : ev.body.errors[0].message;
      //   }
      // }),
      retry(request.body ? 1 : 0),
      catchError((exception: HttpErrorResponse) => {
        if (exception) {
          let errorMessage = '';
          switch (true) {
            case exception.error instanceof ErrorEvent:
              errorMessage = `Error: ${exception.error.message}`;
              this.toastr.error(errorMessage);
              break;
            case exception.status === 400:
              if (exception.error.errors) {
                const modalStateErrors = [];
                for (const key in exception.error.errors) {
                  if (exception.error.errors[key]) {
                    modalStateErrors.push(exception.error.errors[key]);
                  }
                }
                throw modalStateErrors.flat();
              } else if (typeof exception.error === 'object') {
                this.toastr.error(exception.statusText);
              } else {
                this.toastr.error(exception.error);
              }
              break;
            case exception.status === 0:
              this.toastr.error(
                'There is no server listening to the url',
                'Server Stopped'
              );
              break;
            case exception.status === 401:
              this.authService.logout();
              this.toastr.warning(
                'Your session has expired, please login again',
                'Session Expired'
              );
              break;
            case exception.status === 403:
              this.toastr.warning(
                'You are not permitted to access',
                'Forbidden'
              );
              break;
            case exception.status === 404:
              this.toastr.warning('Resource not found', 'Not Found');
              break;
            case exception.status === 500:
              errorMessage =
                exception.error.message ??
                'Error happened on the server please try again later';
              this.toastr.error(errorMessage, 'Server Error');
              // const navigationExtras: NavigationExtras = {
              //   state: { error: error.error },
              // };
              // this.router.navigateByUrl('/server-error', navigationExtras);
              break;
            default:
              this.toastr.error('Something unexpected went wrong');
              console.log(exception);
              break;
          }
        }
        return throwError(() => exception);
      })
    );
  }

  // if want to show validation error on toast
  private constructBadRequestErrors(
    exception: HttpErrorResponse,
    errorMessage: string
  ): string {
    if (exception.error) {
      if (Array.isArray(exception.error)) {
        for (const err of exception.error) {
          errorMessage = `${errorMessage}\n${err}`;
        }
      } else if (exception.error.errors) {
        for (const key in exception.error.errors) {
          if (
            Object.prototype.hasOwnProperty.call(exception.error.errors, key)
          ) {
            const element = exception.error.errors[key];
            errorMessage = `${errorMessage}\n${element}`;
          }
        }
      } else if (typeof exception.error == 'string') {
        errorMessage = exception.error;
      }
    }
    return errorMessage;
  }
}
