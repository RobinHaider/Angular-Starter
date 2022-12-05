import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { retry } from 'rxjs';
import { Activity } from '../../models/activity';
import { ActivityService } from '../../services/activity.service';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.scss'],
})
export class ActivityDetailsComponent implements OnInit {
  activity: Activity | undefined;
  routeParamId: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activityService: ActivityService,
    private toastService: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const routeParam = this.route.snapshot.paramMap.get('id');
    if (!routeParam) {
      // goBack to List
      this.router.navigate(['/examples/activities']);
    } else {
      this.routeParamId = routeParam;
      console.log('RouteParam', this.routeParamId);
      this.getActivity(this.routeParamId);
    }
  }

  getActivity(id: string) {
    this.activityService.getById(id).subscribe({
      next: (response) => {
        console.log('activity', response);
        this.activity = response;
      },
      error: (error) => {
        console.log(error);
        this.router.navigate(['/examples/activities']);
      },
      complete: () => {},
    });
  }

  openDialog(id: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No',
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log('confirmed', id);
        this.activityService
          .delete(id)
          .pipe(retry(2))
          .subscribe({
            // on success
            next: (response) => {
              console.log('response', response);
              this.toastService.success('Deleted Successfully');
              // go to list
              this.router.navigate(['../..'], { relativeTo: this.route });
            },
            error: (error) => {
              console.log('error', error);
            },
            complete: () => {
              console.log('Completed');
            },
          });
      } else {
        console.log('not-confirmed');
      }
    });
  }
}
