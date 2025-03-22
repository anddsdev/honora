/* eslint-disable ts/no-redeclare */
import createRouter from '@/api/lib/create-router';

import type { AppApi } from '../lib/types';

import { BASE_PATH } from '../lib/constans';
import healthRoute from './health.route';

export function registerRoutes(app: AppApi) {
  return app.route('/', healthRoute);
}

// stand alone router type used for api client
export const router = registerRoutes(createRouter().basePath(BASE_PATH));
export type router = typeof router;
