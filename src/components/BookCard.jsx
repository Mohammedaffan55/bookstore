import { Link } from 'react-router-dom';
import BookCover from './BookCover';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';

export default function BookCard({ book }) {
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(book.id);
  return (
    <article className="card">
      <Link to={`/books/${book.id}`} aria-label={`View details for ${book.title}`}>
        <BookCover book={book} />
      </Link>
      <div className="card-body">
        <h3 className="card-title"><Link to={`/books/${book.id}`}>{book.title}</Link></h3>
        <p className="muted">{book.author}</p>
        <div className="row between">
          <strong>{formatPrice(book.price)}</strong>
          <span className="rating" title="Average rating">★ {book.rating}</span>
        </div>
        <button className={inCart ? 'btn btn-ghost' : 'btn'} onClick={() => addToCart(book.id)}>
          {inCart ? 'Add another copy' : 'Add to cart'}
        </button>
      </div>
    </article>
  );
}
