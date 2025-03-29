import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';

import { Loader } from './components/loader';
import { NotFound } from './components/not-found';
import { useSession } from './lib/auth-client';
import { routeTree } from './route-tree.gen';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      // TODO: handle errors
      console.error(error);
    },
  }),
});

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  context: { queryClient, auth: undefined },
  defaultNotFoundComponent: NotFound,
  defaultPendingComponent: Loader,
});

declare module '@tanstack/react-query' {
  // eslint-disable-next-line ts/consistent-type-definitions
  interface Register {
    router: typeof router;
  }
}

function App() {
  const { data, isPending } = useSession();
  // eslint-disable-next-line antfu/if-newline
  if (isPending) return <Loader />;

  const isAuthenticated = {
    isAuthenticated: data !== null,
    user: data ? data.user : null,
    session: data ? data.session : null,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        router={router}
        context={{
          queryClient,
          auth: isAuthenticated || undefined,
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
