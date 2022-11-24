export class PaginationParams {
  pageNumber = 1;
  pageSize = 2;
  search: string | undefined;
  sortBy: string | undefined;
  sortDirection: string | undefined;
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

export interface PagingParams {
  pageNumber: number;
  pageSize: number;
  search: string | null;
  sortBy: string | null;
  sortDirection: string | null;
  sort: string | null;
}
