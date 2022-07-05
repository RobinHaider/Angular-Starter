import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RadioOption } from 'src/app/shared/components/radio-input/radio-input.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  newForm!: FormGroup;
  loading = false;
  genderOptions : RadioOption[] = [
    {value: "male", label: "Male"},
    {value: "female", label: "Female"}
  ]

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
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
      ]),
      dateOfBirth: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      admissionTime: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      termOfPolcy: new FormControl(false, Validators.required),
    });
  }
}
