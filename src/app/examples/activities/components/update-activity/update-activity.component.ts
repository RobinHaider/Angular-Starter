import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize, retry } from 'rxjs';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-update-activity',
  templateUrl: './update-activity.component.html',
  styleUrls: ['./update-activity.component.scss'],
})
export class UpdateActivityComponent implements OnInit {
  newForm!: FormGroup;
  loading = false;
  routeParamId!: string;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private activityService: ActivityService
  ) {}

  ngOnInit(): void {
    this.createForm();
    const routeParam = this.route.snapshot.paramMap.get('id');
    if (!routeParam) {
      // goBack to List
      this.router.navigate(['../..'], { relativeTo: this.route });
    } else {
      this.routeParamId = routeParam;
      console.log('RouteParam', this.routeParamId);
      this.getActivity(this.routeParamId);
    }
  }

  submit() {
    this.loading = true;
    console.log(this.newForm.value);
    this.activityService
      .edit(this.routeParamId, this.newForm.value)
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
          this.toastService.success('Updated Successfully');
          console.log('response', response);
        },
        error: (error) => {
          console.log('error', error);
        },
        complete: () => {
          console.log('Completed');
        },
      });
  }

  getActivity(id: string) {
    this.activityService
      .getById(id)
      .pipe(retry(2))
      .subscribe({
        next: (response) => {
          console.log('activity', response);
          this.newForm.patchValue(response);
        },
        error: (error) => {},
        complete: () => {},
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
