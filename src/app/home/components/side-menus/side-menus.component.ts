import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/models/user';
import { UserRoles } from 'src/app/auth/models/UserRoles';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-side-menus',
  templateUrl: './side-menus.component.html',
  styleUrls: ['./side-menus.component.scss'],
})
export class SideMenusComponent implements OnInit {
  currentUser$: Observable<User | null>;
  userRoles = UserRoles;

  constructor(private authService: AuthService) {
    this.currentUser$ = this.authService.user$;
  }

  ngOnInit(): void {}
  panelOpenState = false;
}
