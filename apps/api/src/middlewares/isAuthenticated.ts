import { createMiddleware } from 'hono/factory';
import { HTTPException } from 'hono/http-exception';

import { Context } from '@/api/lib/types';

export default createMiddleware<Context>(async (c, next) => {
  const user = c.get('user');
  if (!user) {
    throw new HTTPException(401, { message: 'Unauthorized' });
  }
  await next();
});
