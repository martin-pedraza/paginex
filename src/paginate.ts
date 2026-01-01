import { Paginex } from './Paginex';

export const paginate = <T>(
  items: T[],
  pageSize?: number,
  pageNumber?: number
) =>
  new Paginex(items)
    .setPageSize(pageSize ?? 20)
    .setPageNumber(pageNumber ?? 1)
    .paginate();
