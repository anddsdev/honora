import { createRootRouteWithContext, HeadContent, Outlet } from '@tanstack/react-router';

import type { RouterContext } from '../context';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  head: () => ({
    meta: [
      {
        title: 'Honora - Full-stack starter template',
      },
      {
        name: 'description',
        content: 'Honora is a starter template for building full-stack applications with Hono.',
      },
    ],
    links: [
      {
        rel: 'icon',
        href: '/vite.svg', // TODO: replace with your own favicon
      },
    ],
  }),
});

function RootComponent() {
  return (
    <>
      <HeadContent />
      <main className="min-h-screen bg-gradient-to-b from-background/80 to-background">
        <Outlet />
      </main>
    </>
  );
}
