import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  newForm!: FormGroup;
  loading = false;

  constructor() {}

  ngOnInit(): void {
    this.createForm();
  }

  submit() {
    this.loading = true;
    console.log(this.newForm.value);
  }

  private createForm() {
    this.newForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      admissionTime: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      termOfPolcy: new FormControl(false, Validators.required),
    });
  }
}
