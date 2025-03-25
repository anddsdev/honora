import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';

import { NotFound } from './components/not-found';
import { useSession } from './lib/auth-client';
import { routeTree } from './route-tree.gen';

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  context: { queryClient, auth: undefined },
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
  const { data } = useSession();

  const isAuthenticated = !!data?.user;

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        router={router}
        context={{
          auth: isAuthenticated,
          queryClient,
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
