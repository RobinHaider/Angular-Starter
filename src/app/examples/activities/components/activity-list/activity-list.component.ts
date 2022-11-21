import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/core/models/pagination';
import { ActivityDto, ActivityParams } from '../../models/activity';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss'],
})
export class ActivityListComponent implements OnInit {
  defaultParams = new ActivityParams();
  pagination!: Pagination;
  activities: ActivityDto[] = [];

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.activityService.list(this.defaultParams).subscribe((response) => {
      console.log(response);
      this.activities = response.data;
      this.pagination = response.pagination;
    });
  }
}
