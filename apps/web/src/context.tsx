import type { QueryClient } from '@tanstack/react-query';

import type { Session, User } from './lib/auth-client';

export type IsAuthenticated = {
  isAuthenticated: boolean;
  user: User | null;
  session: Session | null;
};

export type RouterContext = {
  queryClient: QueryClient;
  auth: IsAuthenticated | undefined;
};
