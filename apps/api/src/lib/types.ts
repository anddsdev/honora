import type { Hono } from 'hono';

import type { BASE_PATH } from './constans';

export type Fetcher = {
  fetch: (request: Request | URL | string) => Promise<Response>;
};

export type AppEnv = {
  Bindings: {
    ASSETS: Fetcher;
  };
};

// eslint-disable-next-line ts/no-empty-object-type
export type AppApi = Hono<AppEnv, {}, typeof BASE_PATH>;
