import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedResult, Pagination } from 'src/app/core/models/pagination';
import { getPaginatedResult } from 'src/app/core/utils/pagination-helper';
import { environment } from 'src/environments/environment';
import { Activity, ActivityDto, ActivityParams } from '../models/activity';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private baseUrl = environment.apiUrl + 'Activities';
  constructor(private http: HttpClient) {}

  //get activities
  list(activityParams: ActivityParams) {
    let params = new HttpParams();

    //pageNumber
    if (activityParams.pageNumber > 0) {
      params = params.append(
        'pageNumber',
        activityParams.pageNumber.toString()
      );
    }
    //pagesize
    if (activityParams.pageSize > 0) {
      params = params.append('pageSize', activityParams.pageSize.toString());
    }

    return getPaginatedResult<ActivityDto>(
      `${this.baseUrl}`,
      params,
      this.http
    );
  }

  // get activities by id
  getById(id: string) {
    return this.http.get<ActivityDto>(`${this.baseUrl}/${id}`);
  }

  //create activity
  create(activity: Activity) {
    return this.http.post(`${this.baseUrl}`, activity);
  }

  //edit activity
  edit(id: string, activity: Activity) {
    return this.http.put(`${this.baseUrl}/${id}`, activity);
  }

  // delete
  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
