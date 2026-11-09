import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { count } = useCart();
  const { user, logout } = useAuth();
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="brand">Pagewise Books</Link>
        <nav className="nav-links" aria-label="Main">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/books">Browse</NavLink>
          <NavLink to="/cart">Cart{count > 0 && <span className="badge" aria-label={`${count} items`}>{count}</span>}</NavLink>
          {user ? (
            <button className="link-btn" onClick={logout}>Sign out ({user.name.split(' ')[0]})</button>
          ) : (
            <NavLink to="/login">Sign in</NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
