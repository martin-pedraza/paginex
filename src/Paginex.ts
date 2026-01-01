import { PaginationResult } from './types';
import { createPaginationMeta } from './helpers/createPaginationMeta';

export class Paginex<T> {
  private items: T[];
  private pageSize: number = 20;
  private pageNumber: number = 1;
  private filterFn: ((item: T) => boolean) | null = null;
  private orderFn: ((a: T, b: T) => number) | null = null;

  constructor(items: T[]) {
    this.items = Array.isArray(items) ? items : [];
  }

  setPageSize(size: number): this {
    if (Number.isInteger(size) && size > 0) {
      this.pageSize = size;
    }
    return this;
  }

  setPageNumber(page: number): this {
    if (Number.isInteger(page) && page > 0) {
      this.pageNumber = page;
    }
    return this;
  }

  setFilterBy(fn: (item: T) => boolean): this {
    this.filterFn = fn;
    return this;
  }

  setOrderBy(fn: (a: T, b: T) => number): this {
    this.orderFn = fn;
    return this;
  }

  paginate(): PaginationResult<T> {
    let resultItems = [...this.items];

    if (this.filterFn) resultItems = resultItems.filter(this.filterFn);
    if (this.orderFn) resultItems = resultItems.sort(this.orderFn);

    const totalItems = resultItems.length;
    const pagination = createPaginationMeta(
      totalItems,
      this.pageSize,
      this.pageNumber
    );

    const startIndex = (pagination.pageNumber - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;

    return {
      results: resultItems.slice(startIndex, endIndex),
      pagination,
    };
  }
}
