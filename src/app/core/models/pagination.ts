export class PaginationParams {
  pageNumber = 1;
  pageSize = 10;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: Pagination;
}
