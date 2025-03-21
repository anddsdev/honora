import type { Env, Hono } from 'hono';

import type { BASE_PATH } from './constants';
import { auth } from './auth';

export type Fetcher = {
  fetch: (request: Request | URL | string) => Promise<Response>;
};

export type Context = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
  Bindings: {
    ASSETS: Fetcher;
  };
} & Env;

// eslint-disable-next-line ts/no-empty-object-type
export type AppAPI = Hono<Context, {}, typeof BASE_PATH>;
