import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import Bun from 'bun';

import { prisma } from './prisma';

const { BETTER_AUTH_URL, BETTER_AUTH_SECRET, ALLOWED_ORIGINS } = Bun.env;

export const auth = betterAuth({
  baseURL: BETTER_AUTH_URL || 'http://localhost:3000',
  secret: BETTER_AUTH_SECRET || 'secret',
  trustedOrigins: JSON.parse(ALLOWED_ORIGINS || '[]'),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 6,
  },
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'USER',
        select: false,
        input: false,
      },
    },
  },
  advanced: {
    cookiePrefix: 'honora',
    cookies: {
      session_token: {
        attributes: {
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
        },
      },
    },
  },
});
