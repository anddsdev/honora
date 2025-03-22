import type { Env, Hono } from 'hono';

import type { BASE_PATH } from './constans';

export type Fetcher = {
  fetch: (request: Request | URL | string) => Promise<Response>;
};

export type AppEnv = {
  Variables: {
    user: undefined;
    session: undefined;
  };
  Bindings: {
    ASSETS: Fetcher;
  };
} & Env;

// eslint-disable-next-line ts/no-empty-object-type
export type AppApi = Hono<AppEnv, {}, typeof BASE_PATH>;
