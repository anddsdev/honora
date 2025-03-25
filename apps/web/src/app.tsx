import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';

import { NotFound } from './components/not-found';
import { routeTree } from './route-tree.gen';

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  context: { queryClient },
  defaultNotFoundComponent: NotFound,
  defaultPendingComponent: () => (
    // TODO: move to a spinner component
    <div>
      <p>Loading...</p>
    </div>
  ),
});

declare module '@tanstack/react-query' {
  // eslint-disable-next-line ts/consistent-type-definitions
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
