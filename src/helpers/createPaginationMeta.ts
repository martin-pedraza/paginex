import { PaginationMeta } from '../types';

export const createPaginationMeta = (
  totalItems: number,
  pageSize: number,
  pageNumber: number
): PaginationMeta => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const finalPageNumber = Math.min(Math.max(1, pageNumber), totalPages);
  return {
    totalItems,
    pageSize,
    pageNumber: finalPageNumber,
    totalPages,
    hasPrev: finalPageNumber > 1,
    hasNext: finalPageNumber < totalPages,
  };
};
