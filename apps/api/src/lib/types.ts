import type { Env, Hono } from 'hono';

import type { BASE_PATH } from './constants';

export type Fetcher = {
  fetch: (request: Request | URL | string) => Promise<Response>;
};

export type Context = {
  Variables: {
    user: undefined;
    session: undefined;
  };
  Bindings: {
    ASSETS: Fetcher;
  };
} & Env;

// eslint-disable-next-line ts/no-empty-object-type
export type AppAPI = Hono<Context, {}, typeof BASE_PATH>;
