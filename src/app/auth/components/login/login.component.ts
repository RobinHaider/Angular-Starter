import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }
  login(){
    this.loading = true;
    this.router.navigate(['/']);
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
