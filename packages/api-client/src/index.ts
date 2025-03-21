import { router } from '@honora/api/routes';

import { hc } from 'hono/client';

const client = hc<router>('');
export type Client = typeof client;

export default (...args: Parameters<typeof hc>): Client => {
  return hc<router>(...args);
};
