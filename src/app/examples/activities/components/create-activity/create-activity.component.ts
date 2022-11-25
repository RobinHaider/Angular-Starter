import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { catchError, finalize, retry, throwError } from 'rxjs';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.scss'],
})
export class CreateActivityComponent implements OnInit {
  @ViewChild(FormGroupDirective)
  formDirective!: FormGroupDirective;
  newForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private activityService: ActivityService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  submit() {
    this.loading = true;
    console.log(this.newForm.value);
    this.activityService
      .create(this.newForm.value)
      .pipe(
        retry(2),
        finalize(() => {
          this.loading = false;
          console.log('finalize');
        })
        // catchError((error) => {
        //   console.log('catch error');
        //   return of([]);
        //   // return throwError(() => error);
        // })
      )
      .subscribe({
        // on success
        next: (response) => {
          console.log('response', response);
          this.formDirective.resetForm();
        },
        error: (error: HttpErrorResponse) => {
          console.log('error', error);
        },
        complete: () => {
          console.log('Completed');
        },
      });
  }

  private createForm() {
    this.newForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: [''],
      category: ['', Validators.required],
      date: ['', Validators.required],
      city: ['', Validators.required],
      venue: ['', Validators.required],
    });
  }
}
