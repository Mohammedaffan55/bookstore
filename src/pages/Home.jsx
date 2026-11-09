import { Link } from 'react-router-dom';
import { books, categories } from '../data/books';
import BookCard from '../components/BookCard';

export default function Home() {
  const spines = books.slice(0, 8);
  const featured = [...books].sort((a, b) => b.rating - a.rating).slice(0, 4);
  return (
    <>
      <section className="hero">
        <div>
          <h1>Find your next read.</h1>
          <p className="lead">Fiction, science, history, self-help and tech books at honest prices. Search, pick, and get them delivered.</p>
          <div className="row">
            <Link to="/books" className="btn">Browse all books</Link>
            <Link to="/books?category=Technology" className="btn btn-ghost">Tech books</Link>
          </div>
        </div>
        <div className="shelf" aria-label="Featured books">
          {spines.map((b, i) => (
            <Link
              key={b.id}
              to={`/books/${b.id}`}
              className="spine"
              style={{ background: `linear-gradient(90deg, ${b.colors[0]}, ${b.colors[1]})`, height: `${200 + (i % 4) * 28}px` }}
              title={`${b.title} by ${b.author}`}
            >
              <span>{b.title}</span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2>Shop by category</h2>
        <div className="chips">
          {categories.filter((c) => c !== 'All').map((c) => (
            <Link key={c} to={`/books?category=${encodeURIComponent(c)}`} className="chip">{c}</Link>
          ))}
        </div>
      </section>

      <section>
        <h2>Highest rated</h2>
        <div className="grid">{featured.map((b) => <BookCard key={b.id} book={b} />)}</div>
      </section>
    </>
  );
}
