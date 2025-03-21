import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';

import { routeTree } from './route-tree.gen';

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: { queryClient },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
