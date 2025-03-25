/* eslint-disable eslint-comments/no-unlimited-disable */

/* eslint-disable */

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root';
import { Route as AuthRouteImport } from './routes/auth/route';
import { Route as IndexImport } from './routes/index';
import { Route as AuthSignUpImport } from './routes/auth/sign-up';
import { Route as AuthSignInImport } from './routes/auth/sign-in';

// Create/Update Routes

const AuthRouteRoute = AuthRouteImport.update({
  id: '/auth',
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any);

const AuthSignUpRoute = AuthSignUpImport.update({
  id: '/sign-up',
  path: '/sign-up',
  getParentRoute: () => AuthRouteRoute,
} as any);

const AuthSignInRoute = AuthSignInImport.update({
  id: '/sign-in',
  path: '/sign-in',
  getParentRoute: () => AuthRouteRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/';
      path: '/';
      fullPath: '/';
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    '/auth': {
      id: '/auth';
      path: '/auth';
      fullPath: '/auth';
      preLoaderRoute: typeof AuthRouteImport;
      parentRoute: typeof rootRoute;
    };
    '/auth/sign-in': {
      id: '/auth/sign-in';
      path: '/sign-in';
      fullPath: '/auth/sign-in';
      preLoaderRoute: typeof AuthSignInImport;
      parentRoute: typeof AuthRouteImport;
    };
    '/auth/sign-up': {
      id: '/auth/sign-up';
      path: '/sign-up';
      fullPath: '/auth/sign-up';
      preLoaderRoute: typeof AuthSignUpImport;
      parentRoute: typeof AuthRouteImport;
    };
  }
}

// Create and export the route tree

interface AuthRouteRouteChildren {
  AuthSignInRoute: typeof AuthSignInRoute;
  AuthSignUpRoute: typeof AuthSignUpRoute;
}

const AuthRouteRouteChildren: AuthRouteRouteChildren = {
  AuthSignInRoute: AuthSignInRoute,
  AuthSignUpRoute: AuthSignUpRoute,
};

const AuthRouteRouteWithChildren = AuthRouteRoute._addFileChildren(AuthRouteRouteChildren);

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute;
  '/auth': typeof AuthRouteRouteWithChildren;
  '/auth/sign-in': typeof AuthSignInRoute;
  '/auth/sign-up': typeof AuthSignUpRoute;
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute;
  '/auth': typeof AuthRouteRouteWithChildren;
  '/auth/sign-in': typeof AuthSignInRoute;
  '/auth/sign-up': typeof AuthSignUpRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  '/': typeof IndexRoute;
  '/auth': typeof AuthRouteRouteWithChildren;
  '/auth/sign-in': typeof AuthSignInRoute;
  '/auth/sign-up': typeof AuthSignUpRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths: '/' | '/auth' | '/auth/sign-in' | '/auth/sign-up';
  fileRoutesByTo: FileRoutesByTo;
  to: '/' | '/auth' | '/auth/sign-in' | '/auth/sign-up';
  id: '__root__' | '/' | '/auth' | '/auth/sign-in' | '/auth/sign-up';
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute;
  AuthRouteRoute: typeof AuthRouteRouteWithChildren;
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthRouteRoute: AuthRouteRouteWithChildren,
};

export const routeTree = rootRoute._addFileChildren(rootRouteChildren)._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/auth"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/auth": {
      "filePath": "auth/route.tsx",
      "children": [
        "/auth/sign-in",
        "/auth/sign-up"
      ]
    },
    "/auth/sign-in": {
      "filePath": "auth/sign-in.tsx",
      "parent": "/auth"
    },
    "/auth/sign-up": {
      "filePath": "auth/sign-up.tsx",
      "parent": "/auth"
    }
  }
}
ROUTE_MANIFEST_END */
