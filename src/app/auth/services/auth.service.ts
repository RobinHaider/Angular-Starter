import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map, Observable, ReplaySubject, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login, RegisterDto } from '../models/login';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl + 'account/';
  private userSubject: BehaviorSubject<User | null>;
  public user$: Observable<User | null>;

  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<User | null>(null);
    this.user$ = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  loggedIn() {
    if (this.userValue == null) {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(this.userValue.token);
  }

  login(values: Login) {
    return this.http
      .post<User>(this.baseUrl + 'login', values, { withCredentials: true })
      .pipe(
        map((user: User) => {
          this.userSubject.next(user);
          this.startRefreshTokenTimer();
          return user;
        })
      );
  }

  logout() {
    console.log('logout');
    this.http
      .post(this.baseUrl + 'logout', {}, { withCredentials: true })
      .pipe(take(1))
      .subscribe();
    this.stopRefreshTokenTimer();
    this.userSubject.next(null);
    this.router.navigateByUrl('/auth/login');
  }

  register(values: RegisterDto) {
    return this.http.post(this.baseUrl + 'register', values);
  }

  refreshToken() {
    // console.log('refresh time', new Date());
    return this.http
      .post<User>(this.baseUrl + 'refreshToken', {}, { withCredentials: true })
      .pipe(
        map((user: User) => {
          this.userSubject.next(user);
          this.startRefreshTokenTimer();
          return user;
        })
      );
  }

  //For Checking Roles
  roleMatch(allowedRoles: string[]): boolean {
    let match = false;
    if (this.userValue?.roles) {
      allowedRoles.forEach((element) => {
        if (this.userValue?.roles.includes(element)) {
          match = true;
        }
      });
    }
    return match;
  }

  clearUser() {}

  // helper methods

  private refreshTokenTimeout?: NodeJS.Timeout;

  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtBase64 = this.userValue!.token!.split('.')[1];
    const jwtToken = JSON.parse(atob(jwtBase64));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    this.refreshTokenTimeout = setTimeout(
      () => this.refreshToken().subscribe(),
      timeout
    );
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
