import { Link, useParams } from 'react-router-dom';
import { readStorage } from '../utils/storage';
import { formatPrice } from '../utils/format';

export default function OrderSuccess() {
  const { orderId } = useParams();
  const order = readStorage('bookstore_orders', []).find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="state-box" role="alert">
        <h2>Order not found</h2>
        <p>We couldn't find order {orderId} in this browser.</p>
        <Link to="/books" className="btn">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="state-box">
      <h1>Thank you, {order.customer.name.split(' ')[0]}. Your order is placed.</h1>
      <p>Order number <strong>{order.id}</strong>. A confirmation will be sent to {order.customer.email}.</p>
      <ul className="mini-list">
        {order.items.map((i) => <li key={i.id}><span>{i.title} × {i.qty}</span><span>{formatPrice(i.price * i.qty)}</span></li>)}
        <li className="total"><span>Total paid on delivery</span><span>{formatPrice(order.total)}</span></li>
      </ul>
      <p className="muted">Delivering to {order.customer.address}, {order.customer.city} {order.customer.pincode}</p>
      <Link to="/books" className="btn">Keep browsing</Link>
    </div>
  );
}
