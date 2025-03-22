import { Hono } from 'hono';

import type { Context } from './types';

export default function createRouter() {
  return new Hono<Context>();
}
