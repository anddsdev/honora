import type { ApiRouter } from '@honora/api/routes';

import { hc } from 'hono/client';

const client = hc<ApiRouter>('', {
  fetch: (input: RequestInfo | URL, init?: RequestInit) => {
    return fetch(input, {
      ...init,
      credentials: 'include',
    });
  },
});
export type Client = typeof client;

export default (...args: Parameters<typeof hc>): Client => {
  return hc<ApiRouter>(...args);
};
