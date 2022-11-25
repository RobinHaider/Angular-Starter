import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { retry } from 'rxjs';
import { Activity } from '../../models/activity';
import { ActivityService } from '../../services/activity.service';

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
    private activityService: ActivityService
  ) {}

  ngOnInit(): void {
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

  getActivity(id: string) {
    this.activityService
      .getById(id)
      .pipe(retry(2))
      .subscribe({
        next: (response) => {
          console.log('activity', response);
          this.activity = response;
        },
        error: (error) => {},
        complete: () => {},
      });
  }
}
