import { OK } from 'stoker/http-status-codes';

import createRouter from '../lib/create-router';

const router = createRouter().get('/health', (c) => {
  return c.json({ message: 'Hello World!' }, OK);
});

export default router;
