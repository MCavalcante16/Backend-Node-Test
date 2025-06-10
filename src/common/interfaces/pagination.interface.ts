export interface IPaginationOptions {
  page?: number;
  limit?: number;
}

export interface IPaginationResult<T> {
  items: T[];
  total: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
