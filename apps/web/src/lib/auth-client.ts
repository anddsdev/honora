import { createAuthClient } from 'better-auth/react';

export const { signIn, signOut, useSession, signUp } = createAuthClient({
  baseURL: import.meta.env.BETTER_AUTH_URL,
  secret: 'secret',
  fetchOptions: {
    credentials: 'include',
  },
});
