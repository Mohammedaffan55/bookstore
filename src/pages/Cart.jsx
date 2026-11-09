import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { MAX_QTY } from '../context/cartReducer';
import BookCover from '../components/BookCover';
import { formatPrice } from '../utils/format';

export default function Cart() {
  const { lines, subtotal, shipping, total, freeShippingAbove, setQty, removeFromCart, clearCart } = useCart();

  if (lines.length === 0) {
    return (
      <div className="state-box">
        <h2>Your cart is empty</h2>
        <p>Add a few books and they will show up here.</p>
        <Link to="/books" className="btn">Browse books</Link>
      </div>
    );
  }

  return (
    <>
      <h1>Your cart</h1>
      <div className="cart-layout">
        <ul className="cart-list">
          {lines.map((l) => (
            <li key={l.id} className="cart-item">
              <BookCover book={l} size="sm" />
              <div className="grow">
                <Link to={`/books/${l.id}`} className="card-title">{l.title}</Link>
                <p className="muted">{l.author}</p>
                <div className="row">
                  <div className="stepper">
                    <button aria-label={`Decrease quantity of ${l.title}`} onClick={() => setQty(l.id, l.qty - 1)}>−</button>
                    <span aria-live="polite">{l.qty}</span>
                    <button aria-label={`Increase quantity of ${l.title}`} disabled={l.qty >= MAX_QTY} onClick={() => setQty(l.id, l.qty + 1)}>+</button>
                  </div>
                  <button className="link-btn danger" onClick={() => removeFromCart(l.id)}>Remove</button>
                </div>
              </div>
              <strong>{formatPrice(l.price * l.qty)}</strong>
            </li>
          ))}
        </ul>

        <aside className="summary">
          <h2>Order summary</h2>
          <dl>
            <div><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
            <div><dt>Shipping</dt><dd>{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd></div>
            <div className="total"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
          </dl>
          {shipping > 0 && <p className="muted">Spend {formatPrice(freeShippingAbove - subtotal)} more for free shipping.</p>}
          <Link to="/checkout" className="btn block">Go to checkout</Link>
          <button className="link-btn danger" onClick={clearCart}>Empty cart</button>
        </aside>
      </div>
    </>
  );
}
