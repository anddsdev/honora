import { Hono } from 'hono';

import type { AppEnv } from './types';

export default function createRouter() {
  return new Hono<AppEnv>({
    strict: true,
  });
}
