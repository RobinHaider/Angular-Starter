import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  loading = false;
  returnUrl = '/auth/login';

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  signup() {
    this.loading = true;
    this.authService.register(this.signupForm.value).subscribe(
      (response: any) => {
        console.log(response);
        this.toastService.success(response.result);
        this.router.navigateByUrl(this.returnUrl);
        this.loading = false;
      },
      (error: HttpErrorResponse) => {
        this.toastService.error(error.message);
        this.loading = false;
      }
    );
  }

  private createForm() {
    this.signupForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }
}
