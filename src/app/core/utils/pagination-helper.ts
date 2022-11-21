import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { PaginatedResult } from '../models/pagination';

export function getPaginatedResult<T>(
  url: string,
  params: HttpParams,
  http: HttpClient
) {
  const paginatedResult: PaginatedResult<T> = {} as PaginatedResult<T>;

  return http.get<T[]>(url, { observe: 'response', params }).pipe(
    map((response) => {
      if (response.body) {
        paginatedResult.data = response.body;
      }
      if (response.headers.get('Pagination') !== null) {
        const paginationJson = response.headers.get('Pagination');
        if (paginationJson) {
          paginatedResult.pagination = JSON.parse(paginationJson);
        }
      }
      return paginatedResult;
    })
  );
}
