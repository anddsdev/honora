import { serveStatic } from 'hono/bun';

import type { AppAPI } from './types';

import { BASE_PATH } from './constants';
import createRouter from './create-router';

export default function createApp() {
  const app = createRouter()
    .use('*', serveStatic({ root: './public' }))
    .use(async (c, next) => {
      if (c.req.path.startsWith(BASE_PATH)) {
        return next();
      }
      const { origin } = new URL(c.req.raw.url);

      return c.env.ASSETS.fetch(new URL('/index.html', origin));
    })
    .basePath(BASE_PATH) as AppAPI;

  return app;
}
