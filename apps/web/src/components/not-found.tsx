import { Link } from '@tanstack/react-router';

import { Button } from './ui/button';

export function NotFound() {
  return (
    <div className="min-h-screen flex-col  flex size-full items-center justify-center p-2 text-2xl">
      <div className="flex flex-col items-center gap-4">
        <p className="text-5xl font-bold">404</p>
        <p className="text-lg">
          Oops we couldn't find the page you are looking for. Please check the URL and try again.
        </p>
        <Button asChild>
          <Link to="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
}
