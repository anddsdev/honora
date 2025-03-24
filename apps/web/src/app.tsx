import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { routeTree } from './route-tree.gen';
import { NotFound } from './components/not-found';

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
