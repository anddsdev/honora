import { Hono } from 'hono';

const index = new Hono();

const app = new Hono();

function registerRoutes(app: Hono) {
  return app.route('/', index);
}

export const router = registerRoutes(app.basePath('/api'));

// eslint-disable-next-line ts/no-redeclare
export type router = typeof router;
