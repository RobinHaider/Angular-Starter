import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  catchError,
  merge,
  startWith,
  switchMap,
  of,
  map,
  retry,
  finalize,
} from 'rxjs';
import { Pagination } from 'src/app/core/models/pagination';
import { ActivityDto, ActivityParams } from '../../models/activity';
import { ActivityService } from '../../services/activity.service';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss'],
})
export class ActivityListComponent implements OnInit, AfterViewInit {
  defaultParams = new ActivityParams();
  pagination: Pagination = {} as Pagination;
  activities: ActivityDto[] = [];
  displayedColumns: string[] = [
    'position',
    'title',
    'category',
    'date',
    'city',
    'venue',
    'actions',
    'delete',
  ];
  isLoadingResults = true;
  pageSizeOptions = [2, 4, 6];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private activityService: ActivityService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastrService,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.paginator.page, this.sort.sortChange)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.defaultParams.pageNumber = this.paginator.pageIndex + 1;
          this.defaultParams.pageSize = this.paginator.pageSize;
          this.defaultParams.sortBy = this.sort.active;
          this.defaultParams.sortDirection = this.sort.direction;
          console.log('Called');

          return this.loadData();
        })
      )
      .subscribe();
  }

  ngOnInit(): void {}

  applyFilter(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value;
    console.log(searchValue.trim().toLowerCase());
    this.defaultParams.search = searchValue.trim().toLocaleLowerCase();
    this.loadData().subscribe();
  }

  loadData() {
    this.isLoadingResults = true;
    return this.activityService.list(this.defaultParams).pipe(
      finalize(() => {
        setTimeout(() => {
          this.isLoadingResults = false;
        }, 1000);
        console.log('finalize');
      }),
      catchError(() => of(null)),
      map((result) => {
        if (result === null) {
          return [];
        }

        // Only refresh the result length if there is new data. In case of rate
        // limit errors, we do not want to reset the paginator to zero, as that
        // would prevent users from re-triggering requests.
        this.pagination = result.pagination;
        // delete timeout
        setTimeout(() => {
          this.isLoadingResults = false;
          this.activities = result.data;
        }, 1000);

        return result.data;
      })
    );
  }

  onRowClicked(id: string) {
    console.log('row clicked', id);
    this.router.navigate(['details', id], { relativeTo: this.route });
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
        this.isLoadingResults = true;
        this.activityService
          .delete(id)
          .pipe(
            retry(2),
            finalize(() => {
              this.isLoadingResults = false;
            })
          )
          .subscribe({
            // on success
            next: (response) => {
              console.log('response', response);
              this.toastService.success(
                'Deleted Successfully',
                this.activities.find((a) => a.id == id)?.title
              );
              // reload data
              this.loadData().subscribe();
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
