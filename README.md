# paginex

✨ A lightweight pagination library for TypeScript/JavaScript ✨

## Overview

`paginex` provides a simple and flexible way to paginate, filter, and sort arrays in your JavaScript or TypeScript projects. You can use it in two primary ways: with the `paginate` function or with the `Paginex` class for more advanced configurations.

## Installation

```bash
npm install paginex
```

## Usage

### 1. Function-Based Pagination (`paginate`)
The `paginate` function offers a quick and easy way to paginate arrays with default settings.

```js
import { paginate } from 'paginex';

const items = [
  { id: 1, name: 'Item 1', price: 100 },
  { id: 2, name: 'Item 2', price: 200 },
  { id: 3, name: 'Item 3', price: 150 },
  // ... more items
];

const { results, pagination } = paginate(items, 10, 1); // pageSize: 10, pageNumber: 1

console.log(result);
// Output: {
//   results: [...]
// }
console.log(pagination);
// Output: {
//   pagination: {
//     totalItems: 100,
//     pageSize: 10,
//     pageNumber: 1,
//     totalPages: 10,
//     hasPrev: false,
//     hasNext: true
//   }
// }
```

### 2. Class-Based Pagination (`Paginex`)
The `Paginex` class provides more control and flexibility, allowing you to filter and sort your data before pagination.

```js
import { Paginex } from 'paginex';

const products = [
  { id: 1, name: 'Laptop', price: 1200, category: 'Electronics' },
  { id: 2, name: 'Mouse', price: 25, category: 'Electronics' },
  { id: 3, name: 'Desk', price: 300, category: 'Furniture' },
  // ... more products
];

const paginex = new Paginex(products)
  .setFilterBy((product) => product.price > 50)
  .setOrderBy((a, b) => a.price - b.price)
  .setPageSize(5)
  .setPageNumber(1)
  .paginate();

console.log(paginex.results);
console.log(paginex.pagination);
```

## API Reference
- `paginate(items: T[], pageSize?: number, pageNumber?: number): PaginationResult<T>` (Function) - Paginate an array.
- `Paginex<T>(items: T[])` (Class) - Create a pagination instance.
  - `setPageSize(size: number): this` - Set the page size.
  - `setPageNumber(page: number): this` - Set the page number.
  - `setFilterBy(fn: (item: T) => boolean): this` - Filter items.
  - `setOrderBy(fn: (a: T, b: T) => number): this` - Sort items.
  - `paginate(): PaginationResult<T>` - Execute pagination.

## Response Details (`PaginationResult<T>`)
The `PaginationResult<T>` object returned by both methods contains the following properties:

- `results: T[]`: An array containing the items for the current page.
- `pagination`: An object containing pagination metadata:
  - `totalItems: number` - The total number of items.
  - `pageSize: number` - The number of items per page.
  - `pageNumber: number` - The current page number.
  - `totalPages: number` - The total number of pages.
  - `hasPrev: boolean` - true if there is a previous page, false otherwise.
  - `hasNext: boolean` - true if there is a next page, false otherwise.