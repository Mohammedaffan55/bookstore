import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { books, categories } from '../data/books';
import BookCard from '../components/BookCard';
import { filterBooks } from '../utils/filterBooks';
import { formatPrice } from '../utils/format';

const MAX = Math.max(...books.map((b) => b.price));

export default function BookListing() {
  // Filters live in the URL so results can be shared and the back button works.
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const category = params.get('category') ?? 'All';
  const sort = params.get('sort') ?? 'relevance';
  const maxPrice = Number(params.get('max')) || MAX;

  const update = (key, value, defaultValue) => {
    const next = new URLSearchParams(params);
    if (value === defaultValue || value === '') next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const results = useMemo(
    () => filterBooks(books, { query, category, maxPrice, sort }),
    [query, category, maxPrice, sort]
  );

  return (
    <>
      <h1>Browse books</h1>
      <div className="filters">
        <label className="field grow">
          <span>Search by title or author</span>
          <input type="search" value={query} placeholder="e.g. Sapiens or Carl Sagan" onChange={(e) => update('q', e.target.value, '')} />
        </label>
        <label className="field">
          <span>Category</span>
          <select value={category} onChange={(e) => update('category', e.target.value, 'All')}>
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        <label className="field">
          <span>Sort by</span>
          <select value={sort} onChange={(e) => update('sort', e.target.value, 'relevance')}>
            <option value="relevance">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="rating">Rating</option>
            <option value="title">Title A–Z</option>
          </select>
        </label>
        <label className="field">
          <span>Max price: {formatPrice(maxPrice)}</span>
          <input type="range" min="200" max={MAX} step="50" value={maxPrice} onChange={(e) => update('max', e.target.value, String(MAX))} />
        </label>
      </div>

      <p className="muted" aria-live="polite">{results.length} {results.length === 1 ? 'book' : 'books'} found</p>

      {results.length === 0 ? (
        <div className="state-box">
          <h2>No books match your search</h2>
          <p>Try a different title, author or category, or raise the price limit.</p>
          <button className="btn" onClick={() => setParams({})}>Clear filters</button>
        </div>
      ) : (
        <div className="grid">{results.map((b) => <BookCard key={b.id} book={b} />)}</div>
      )}
    </>
  );
}
