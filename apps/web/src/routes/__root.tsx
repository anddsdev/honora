import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { RouterContext } from '../context';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <main>
      <Outlet />
    </main>
  );
}
