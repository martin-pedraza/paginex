import { Paginex } from '../src';

describe('Paginex', () => {
  const mockItems = [
    { id: 1, name: 'Item 1', price: 100 },
    { id: 2, name: 'Item 2', price: 200 },
    { id: 3, name: 'Item 3', price: 150 },
    { id: 4, name: 'Item 4', price: 300 },
    { id: 5, name: 'Item 5', price: 250 },
    { id: 6, name: 'Item 6', price: 180 },
    { id: 7, name: 'Item 7', price: 220 },
    { id: 8, name: 'Item 8', price: 120 },
  ];

  describe('constructor', () => {
    it('initializes with an array of items', () => {
      const paginex = new Paginex(mockItems);
      const result = paginex.paginate();
      expect(result.results.length).toBeGreaterThan(0);
    });

    it('handles empty array', () => {
      const paginex = new Paginex([]);
      const result = paginex.paginate();
      expect(result.results).toEqual([]);
    });

    it('handles non-array input gracefully', () => {
      const paginex = new Paginex(null as any);
      const result = paginex.paginate();
      expect(result.results).toEqual([]);
    });
  });

  describe('setPageSize', () => {
    it('sets the page size correctly', () => {
      const paginex = new Paginex(mockItems);
      const result = paginex.setPageSize(3).paginate();
      expect(result.results.length).toBe(3);
    });

    it('ignores negative page size', () => {
      const paginex = new Paginex(mockItems);
      const result = paginex.setPageSize(-1).paginate();
      expect(result.pagination.pageSize).toBe(20); // default value
    });

    it('ignores zero page size', () => {
      const paginex = new Paginex(mockItems);
      const result = paginex.setPageSize(0).paginate();
      expect(result.pagination.pageSize).toBe(20); // default value
    });

    it('ignores non-integer page size', () => {
      const paginex = new Paginex(mockItems);
      const result = paginex.setPageSize(3.5).paginate();
      expect(result.pagination.pageSize).toBe(20); // default value
    });

    it('returns this for method chaining', () => {
      const paginex = new Paginex(mockItems);
      const result = paginex.setPageSize(5);
      expect(result).toBe(paginex);
    });
  });

  describe('setPageNumber', () => {
    it('sets the page number correctly', () => {
      const paginex = new Paginex(mockItems);
      const result = paginex
        .setPageSize(3)
        .setPageNumber(2)
        .paginate();
      expect(result.results[0].id).toBe(4);
    });

    it('ignores negative page number', () => {
      const paginex = new Paginex(mockItems);
      const result = paginex.setPageNumber(-1).paginate();
      expect(result.pagination.pageNumber).toBe(1); // default value
    });

    it('ignores zero page number', () => {
      const paginex = new Paginex(mockItems);
      const result = paginex.setPageNumber(0).paginate();
      expect(result.pagination.pageNumber).toBe(1); // default value
    });

    it('ignores non-integer page number', () => {
      const paginex = new Paginex(mockItems);
      const result = paginex.setPageNumber(2.5).paginate();
      expect(result.pagination.pageNumber).toBe(1); // default value
    });

    it('returns this for method chaining', () => {
      const paginex = new Paginex(mockItems);
      const result = paginex.setPageNumber(2);
      expect(result).toBe(paginex);
    });
  });

  describe('setFilterBy', () => {
    it('filters items correctly', () => {
      const paginex = new Paginex(mockItems);
      const result = paginex.setFilterBy(item => item.price > 200).paginate();
      expect(result.results.length).toBe(3);
      expect(result.results.every(item => item.price > 200)).toBe(true);
    });

    it('returns empty array when no items match filter', () => {
      const paginex = new Paginex(mockItems);
      const result = paginex.setFilterBy(item => item.price > 1000).paginate();
      expect(result.results).toEqual([]);
    });

    it('returns this for method chaining', () => {
      const paginex = new Paginex(mockItems);
      const result = paginex.setFilterBy(item => item.price > 200);
      expect(result).toBe(paginex);
    });
  });

  describe('setOrderBy', () => {
    it('orders items in ascending order', () => {
      const paginex = new Paginex(mockItems);
      const result = paginex.setOrderBy((a, b) => a.price - b.price).paginate();
      expect(result.results[0].price).toBe(100);
      expect(result.results[1].price).toBe(120);
    });

    it('orders items in descending order', () => {
      const paginex = new Paginex(mockItems);
      const result = paginex.setOrderBy((a, b) => b.price - a.price).paginate();
      expect(result.results[0].price).toBe(300);
      expect(result.results[1].price).toBe(250);
    });

    it('returns this for method chaining', () => {
      const paginex = new Paginex(mockItems);
      const result = paginex.setOrderBy((a, b) => a.price - b.price);
      expect(result).toBe(paginex);
    });
  });

  describe('paginate', () => {
    it('returns first page with default settings', () => {
      const paginex = new Paginex(mockItems);
      const result = paginex.paginate();
      expect(result.results.length).toBe(8);
      expect(result.pagination.pageNumber).toBe(1);
      expect(result.pagination.pageSize).toBe(20);
    });

    it('returns correct page with custom page size', () => {
      const paginex = new Paginex(mockItems);
      const result = paginex.setPageSize(3).paginate();
      expect(result.results.length).toBe(3);
      expect(result.results[0].id).toBe(1);
    });

    it('returns second page correctly', () => {
      const paginex = new Paginex(mockItems);
      const result = paginex
        .setPageSize(3)
        .setPageNumber(2)
        .paginate();
      expect(result.results.length).toBe(3);
      expect(result.results[0].id).toBe(4);
    });

    it('returns last page with remaining items', () => {
      const paginex = new Paginex(mockItems);
      const result = paginex
        .setPageSize(3)
        .setPageNumber(3)
        .paginate();
      expect(result.results.length).toBe(2);
      expect(result.results[0].id).toBe(7);
    });

    it('returns last page for page beyond total pages', () => {
      const paginex = new Paginex(mockItems);
      const result = paginex
        .setPageSize(3)
        .setPageNumber(10)
        .paginate();
      expect(result.results).toContainEqual(mockItems[6]);
    });

    it('applies filter and order together', () => {
      const paginex = new Paginex(mockItems);
      const result = paginex
        .setFilterBy(item => item.price > 150)
        .setOrderBy((a, b) => a.price - b.price)
        .setPageSize(3)
        .paginate();
      expect(result.results.length).toBe(3);
      expect(result.results[0].price).toBe(180);
      expect(result.results[1].price).toBe(200);
    });

    it('applies all methods with method chaining', () => {
      const paginex = new Paginex(mockItems);
      const result = paginex
        .setPageSize(2)
        .setPageNumber(2)
        .setFilterBy(item => item.price > 100)
        .setOrderBy((a, b) => b.price - a.price)
        .paginate();
      expect(result.results.length).toBe(2);
      expect(result.pagination.pageNumber).toBe(2);
    });

    it('does not mutate original items array', () => {
      const originalItems = [...mockItems];
      const paginex = new Paginex(mockItems);
      paginex
        .setFilterBy(item => item.price > 200)
        .setOrderBy((a, b) => b.price - a.price)
        .paginate();
      expect(mockItems).toEqual(originalItems);
    });
  });
});
