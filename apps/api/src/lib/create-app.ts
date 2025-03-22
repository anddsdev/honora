import { serveStatic } from 'hono/bun';

import type { AppApi } from './types';

import { BASE_PATH } from './constans';
import createRouter from './create-router';

export default function createApp() {
  const app = createRouter()
    .use('*', serveStatic({ root: './public' }))
    .use('*', (c, next) => {
      // If the request is for the API, pass it to the next handler.
      // Otherwise, serve the static files.
      if (c.req.path.startsWith(BASE_PATH)) {
        return next();
      }
      const requestUrl = new URL(c.req.raw.url);
      return c.env.ASSETS.fetch(new URL('/index.html', requestUrl.origin));
    })
    .basePath(BASE_PATH) as AppApi;

  return app;
}
