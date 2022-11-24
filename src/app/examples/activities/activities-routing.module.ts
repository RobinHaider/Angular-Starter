import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityDetailsComponent } from './components/activity-details/activity-details.component';
import { ActivityListComponent } from './components/activity-list/activity-list.component';
import { CreateActivityComponent } from './components/create-activity/create-activity.component';
import { UpdateActivityComponent } from './components/update-activity/update-activity.component';

const routes: Routes = [
  { path: '', component: ActivityListComponent },
  { path: 'create', component: CreateActivityComponent },
  { path: 'update/:id', component: UpdateActivityComponent },
  { path: 'details/:id', component: ActivityDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivitiesRoutingModule {}
