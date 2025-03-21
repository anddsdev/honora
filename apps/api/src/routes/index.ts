import type { AppAPI } from '../lib/types';

import createRouter from '../lib/create-router';
import healthRoute from './health.route';

export function registerRoutes(app: AppAPI) {
  return app.route('/', healthRoute);
}

export const router = registerRoutes(createRouter());

// eslint-disable-next-line ts/no-redeclare
export type router = typeof router;
