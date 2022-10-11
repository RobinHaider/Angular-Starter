import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login, RegisterDto } from '../models/login';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl + 'account/';
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();
  storageName = 'user';
  userRoles: string[] = [];

  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

  loadCurrentUser() {
    const userData = localStorage.getItem(this.storageName);
    if (userData == null) {
      this.clearUser();
      return;
    }
    const user: User = JSON.parse(userData);
    if (!this.loggedIn()) {
      this.clearUser();
      return;
    }
    this.currentUserSource.next(user);
    this.userRoles = user.roles;
  }

  loggedIn() {
    const userData = localStorage.getItem(this.storageName);
    if (userData == null) {
      return false;
    }
    const user: User = JSON.parse(userData);
    if (user !== null) {
      return !this.jwtHelper.isTokenExpired(user.token);
    }
    return false;
  }

  login(values: Login) {
    return this.http.post<User>(this.baseUrl + 'login', values).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem(this.storageName, JSON.stringify(user));
          this.currentUserSource.next(user);
          this.userRoles = user.roles;
        }
      })
    );
  }

  register(values: RegisterDto) {
    return this.http.post(this.baseUrl + 'register', values);
  }

  logout() {
    this.clearUser();
    this.router.navigateByUrl('/auth/login');
  }

  refreshToken() {
    return this.http
      .post<User>(this.baseUrl + 'refreshToken', {}, { withCredentials: true })
      .pipe(
        map((user: User) => {
          if (user) {
            localStorage.setItem(this.storageName, JSON.stringify(user));
            this.currentUserSource.next(user);
            this.userRoles = user.roles;
          }
        })
      );
  }

  //For Checking Roles
  roleMatch(allowedRoles: string[]): boolean {
    let isMatch = false;
    if (this.userRoles) {
      allowedRoles.forEach((element) => {
        if (this.userRoles.includes(element)) {
          isMatch = true;
          return;
        }
      });
    }
    return isMatch;
  }

  private clearUser() {
    localStorage.removeItem(this.storageName);
    this.currentUserSource.next(null);
    this.userRoles = [];
  }
}
