import { AuthService } from 'src/app/auth/services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/models/user';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const user = this.authService.userValue;
    const isLoggedIn = user?.token;
    const isApiUrl = req.url.startsWith(environment.apiUrl);

    if (isLoggedIn && isApiUrl) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${user.token}` },
      });
    }
    req = req.clone({
      withCredentials: true,
    });

    return next.handle(req);
  }
}
