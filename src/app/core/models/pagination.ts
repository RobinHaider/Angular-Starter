export class PaginationParams {
  pageNumber = 1;
  pageSize = 2;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: Pagination;
}
