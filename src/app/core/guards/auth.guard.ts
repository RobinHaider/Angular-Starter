import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastrService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const user = this.authService.userValue;
    if (user) {
      const roles = route.data['roles'] as Array<string>;
      if (roles) {
        const match = this.authService.roleMatch(roles);
        if (match) {
          return true;
        } else {
          this.toastService.error('You are not authorized to access this area');
          // this.router.navigate(['/'], {
          //   // queryParams: { returnUrl: state.url },
          // });
          return false;
        }
      }
      return true;
    }

    // this.toastService.info('Please Log in..');
    this.router.navigate(['home'], {
      // queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
