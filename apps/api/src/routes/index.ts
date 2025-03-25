import type { AppApi } from '../lib/types';

import { BASE_PATH } from '../lib/constans';
import createRouter from '../lib/create-router';
import healthRoute from './health.route';

export function registerRoutes(app: AppApi) {
  return app.route('/', healthRoute);
}

// stand alone router type used for api client
export const router = registerRoutes(createRouter().basePath(BASE_PATH));
// eslint-disable-next-line ts/no-redeclare
export type router = typeof router;
