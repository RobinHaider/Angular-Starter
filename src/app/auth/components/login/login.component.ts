import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  returnUrl = '/';
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();
    // `this.route.queryParams.subscribe(
    //   (params) => (this.returnUrl = params['returnUrl'] || '/')
    // );`
  }
  login() {
    this.loading = true;
    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        this.toastService.success('Login Successfully');
        this.router.navigateByUrl(this.returnUrl);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.toastService.error(error.error);
        this.loading = false;
      }
    );
  }
  private createForm() {
    const savedUserEmail = localStorage.getItem('savedUserEmail');

    this.loginForm = new FormGroup({
      email: new FormControl(savedUserEmail, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(savedUserEmail !== null),
    });
  }
}
