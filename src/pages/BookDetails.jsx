import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { books, getBook } from '../data/books';
import { useCart } from '../context/CartContext';
import { MAX_QTY } from '../context/cartReducer';
import BookCover from '../components/BookCover';
import BookCard from '../components/BookCard';
import { formatPrice } from '../utils/format';

export default function BookDetails() {
  const { id } = useParams();
  const book = getBook(id);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!book) {
    return (
      <div className="state-box" role="alert">
        <h2>Book not found</h2>
        <p>We couldn't find a book with that link. It may have been removed.</p>
        <Link to="/books" className="btn">Back to all books</Link>
      </div>
    );
  }

  const related = books.filter((b) => b.category === book.category && b.id !== book.id).slice(0, 4);

  const handleAdd = () => {
    addToCart(book.id, qty);
    setAdded(true);
  };

  return (
    <>
      <Link to="/books" className="muted">← Back to all books</Link>
      <section className="details">
        <BookCover book={book} size="lg" />
        <div>
          <h1>{book.title}</h1>
          <p className="lead">by {book.author}</p>
          <p className="meta">{book.category} · {book.pages} pages · {book.year} · ★ {book.rating}</p>
          <p className="desc">{book.description}</p>
          <p className="price">{formatPrice(book.price)}</p>
          <div className="row">
            <label className="field qty">
              <span>Quantity</span>
              <select value={qty} onChange={(e) => { setQty(Number(e.target.value)); setAdded(false); }}>
                {Array.from({ length: MAX_QTY }, (_, i) => i + 1).map((n) => <option key={n}>{n}</option>)}
              </select>
            </label>
            <button className="btn" onClick={handleAdd}>Add to cart</button>
          </div>
          {added && (
            <p className="notice" role="status">
              Added {qty} to your cart. <Link to="/cart">View cart</Link>
            </p>
          )}
        </div>
      </section>
      {related.length > 0 && (
        <section>
          <h2>More in {book.category}</h2>
          <div className="grid">{related.map((b) => <BookCard key={b.id} book={b} />)}</div>
        </section>
      )}
    </>
  );
}
