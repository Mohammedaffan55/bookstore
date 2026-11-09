import { Component } from 'react';

// Catches unexpected render errors so the whole app doesn't go blank.
export default class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="state-box" role="alert">
          <h2>Something went wrong</h2>
          <p>Refresh the page to try again. If it keeps happening, go back to the home page.</p>
          <button className="btn" onClick={() => window.location.reload()}>Refresh page</button>
        </div>
      );
    }
    return this.props.children;
  }
}
