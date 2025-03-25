/* eslint-disable style/brace-style */
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

import type { RouterContext } from '../context';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background/80 to-background">
      <Outlet />
    </main>
  );
}
