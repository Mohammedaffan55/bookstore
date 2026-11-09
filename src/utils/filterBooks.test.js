import { describe, it, expect } from 'vitest';
import { filterBooks } from './filterBooks';

const books = [
  { id: 1, title: 'Alpha Code', author: 'Ann Lee', category: 'Technology', price: 500, rating: 4.1 },
  { id: 2, title: 'Beta Story', author: 'Bob Ray', category: 'Fiction', price: 250, rating: 4.7 },
  { id: 3, title: 'Gamma Sky', author: 'Ann Lee', category: 'Science', price: 900, rating: 3.9 },
];

describe('filterBooks', () => {
  it('returns everything with no filters', () => {
    expect(filterBooks(books)).toHaveLength(3);
  });
  it('searches by title and author, case-insensitive', () => {
    expect(filterBooks(books, { query: 'ALPHA' })).toHaveLength(1);
    expect(filterBooks(books, { query: 'ann lee' })).toHaveLength(2);
  });
  it('filters by category and max price', () => {
    expect(filterBooks(books, { category: 'Fiction' })[0].id).toBe(2);
    expect(filterBooks(books, { maxPrice: 500 })).toHaveLength(2);
  });
  it('sorts by price ascending and rating', () => {
    expect(filterBooks(books, { sort: 'price-asc' }).map((b) => b.id)).toEqual([2, 1, 3]);
    expect(filterBooks(books, { sort: 'rating' })[0].id).toBe(2);
  });
  it('returns an empty list when nothing matches', () => {
    expect(filterBooks(books, { query: 'zzz' })).toEqual([]);
  });
});
