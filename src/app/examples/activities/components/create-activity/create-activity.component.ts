import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
  apiValidationErrors: string[] = [];

  constructor(
    private fb: FormBuilder,
    private toastService: ToastrService,
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
          this.toastService.success('Created Successfully');
        },
        error: (error) => {
          console.log('error', error);
          this.apiValidationErrors = error;
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
      category: [''],
      date: ['', Validators.required],
      city: [''],
      venue: ['', Validators.required],
    });
  }
}
