import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="state-box">
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn">Go to home</Link>
    </div>
  );
}
