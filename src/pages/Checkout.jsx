import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { readStorage, writeStorage } from '../utils/storage';
import { formatPrice } from '../utils/format';

export function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Enter your full name.';
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Enter a valid email address.';
  if (!/^[6-9]\d{9}$/.test(v.phone)) e.phone = 'Enter a 10-digit mobile number.';
  if (v.address.trim().length < 8) e.address = 'Enter your full delivery address.';
  if (v.city.trim().length < 2) e.city = 'Enter your city.';
  if (!/^\d{6}$/.test(v.pincode)) e.pincode = 'Enter a 6-digit PIN code.';
  return e;
}

export default function Checkout() {
  const { lines, subtotal, shipping, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: user?.name ?? '', email: user?.email ?? '', phone: '',
    address: '', city: '', pincode: '', payment: 'cod',
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  if (lines.length === 0) return <Navigate to="/cart" replace />;

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const order = {
      id: `PB${Date.now().toString().slice(-8)}`,
      date: new Date().toISOString(),
      customer: values,
      items: lines.map((l) => ({ id: l.id, title: l.title, price: l.price, qty: l.qty })),
      subtotal, shipping, total,
    };
    const orders = readStorage('bookstore_orders', []);
    if (!writeStorage('bookstore_orders', [...orders, order])) {
      setSubmitError('We could not save your order. Check that your browser allows site storage and try again.');
      return;
    }
    clearCart();
    navigate(`/order/${order.id}`, { replace: true });
  };

  const field = (name, label, props = {}) => (
    <label className="field">
      <span>{label}</span>
      <input name={name} value={values[name]} onChange={onChange} aria-invalid={!!errors[name]} {...props} />
      {errors[name] && <small className="error" role="alert">{errors[name]}</small>}
    </label>
  );

  return (
    <>
      <h1>Checkout</h1>
      {!user && <p className="notice">Have an account? <Link to="/login">Sign in</Link> to fill in your details faster. You can also check out as a guest.</p>}
      <div className="cart-layout">
        <form onSubmit={onSubmit} noValidate className="form">
          {field('name', 'Full name', { autoComplete: 'name' })}
          {field('email', 'Email', { type: 'email', autoComplete: 'email' })}
          {field('phone', 'Mobile number', { inputMode: 'numeric', maxLength: 10, autoComplete: 'tel' })}
          {field('address', 'Delivery address', { autoComplete: 'street-address' })}
          <div className="row">
            <div className="grow">{field('city', 'City')}</div>
            <div className="grow">{field('pincode', 'PIN code', { inputMode: 'numeric', maxLength: 6 })}</div>
          </div>
          <label className="field">
            <span>Payment method</span>
            <select name="payment" value={values.payment} onChange={onChange}>
              <option value="cod">Cash on delivery</option>
              <option value="upi">UPI on delivery</option>
              <option value="card">Card on delivery</option>
            </select>
          </label>
          {submitError && <p className="error" role="alert">{submitError}</p>}
          <button className="btn" type="submit">Place order · {formatPrice(total)}</button>
        </form>

        <aside className="summary">
          <h2>Your items</h2>
          <ul className="mini-list">
            {lines.map((l) => <li key={l.id}><span>{l.title} × {l.qty}</span><span>{formatPrice(l.price * l.qty)}</span></li>)}
          </ul>
          <dl>
            <div><dt>Shipping</dt><dd>{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd></div>
            <div className="total"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
          </dl>
        </aside>
      </div>
    </>
  );
}
