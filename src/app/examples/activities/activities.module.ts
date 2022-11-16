import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitiesRoutingModule } from './activities-routing.module';
import { ActivityListComponent } from './components/activity-list/activity-list.component';
import { CreateActivityComponent } from './components/create-activity/create-activity.component';
import { UpdateActivityComponent } from './components/update-activity/update-activity.component';


@NgModule({
  declarations: [
    ActivityListComponent,
    CreateActivityComponent,
    UpdateActivityComponent
  ],
  imports: [
    CommonModule,
    ActivitiesRoutingModule
  ]
})
export class ActivitiesModule { }
