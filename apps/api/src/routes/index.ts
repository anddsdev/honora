import createRouter from '../lib/create-router';
import healthRoute from './health.route';
import { BASE_PATH } from '../lib/constants';
import type { Hono } from 'hono';
import { Context } from '../lib/types';
import { BlankSchema } from 'hono/types';

export function registerRoutes(app: Hono<Context, BlankSchema, '/'>) {
  return app.route('/', healthRoute);
}

export const router = registerRoutes(createRouter().basePath(BASE_PATH));

export type ApiRouter = typeof router;
