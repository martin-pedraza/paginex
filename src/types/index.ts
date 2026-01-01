export type PaginationMeta = {
  totalItems: number;
  pageSize: number;
  pageNumber: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type PaginationResult<T> = {
  results: T[];
  pagination: PaginationMeta;
};
