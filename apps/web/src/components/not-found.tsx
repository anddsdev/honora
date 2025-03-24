import { Link } from '@tanstack/react-router';

export function NotFound() {
  return (
    <div>
      <div>
        <p>404</p>
        <p>Page not found</p>
        <button>
          <Link to="/">Go Home</Link>
        </button>
      </div>
    </div>
  );
}
