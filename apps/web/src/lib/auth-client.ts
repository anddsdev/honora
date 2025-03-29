import { createAuthClient } from 'better-auth/react';

export const { signIn, signOut, useSession, signUp, $Infer, forgetPassword, resetPassword } = createAuthClient({
  baseURL: import.meta.env.BETTER_AUTH_URL,
  secret: 'secret',
  fetchOptions: {
    credentials: 'include',
  },
});

export type User = typeof $Infer.Session.user;
export type Session = typeof $Infer.Session.session;
