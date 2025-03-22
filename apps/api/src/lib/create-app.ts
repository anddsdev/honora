import { serveStatic } from 'hono/bun';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

import type { AppApi } from './types';

import notFound from '../middlewares/not-found';
import onError from '../middlewares/on-error';
import { auth } from './auth';
import { BASE_PATH } from './constans';
import createRouter from './create-router';

// eslint-disable-next-line node/no-process-env
const allowedOrigins = JSON.parse(process.env.ALLOWED_ORIGINS || '[]');

export default function createApp() {
  const app = createRouter()
    .use('*', serveStatic({ root: './public' }))
    .use(async (c, next) => {
      if (c.req.path.startsWith(BASE_PATH)) {
        return next();
      }

      const { origin } = new URL(c.req.raw.url);

      return c.env.ASSETS?.fetch(new URL('/index.html', origin));
    })
    .basePath(BASE_PATH) as AppApi;

  app
    .use(
      '*',
      logger(),
      cors({
        origin: allowedOrigins,
        allowHeaders: ['Content-Type', 'Authorization'],
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
        maxAge: 600,
        credentials: true,
      }),
      async (c, next) => {
        const session = await auth.api.getSession({
          headers: c.req.raw.headers,
        });

        if (!session) {
          c.set('user', null);
          c.set('session', null);
          return next();
        }

        c.set('user', session.user);
        c.set('session', session.session);
        return next();
      },
    )
    .on(['POST', 'GET'], '/auth/*', (c) => {
      return auth.handler(c.req.raw);
    });

  app.notFound(notFound).onError(onError);

  return app;
}
