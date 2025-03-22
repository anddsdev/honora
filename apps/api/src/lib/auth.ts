import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

import { prisma } from './prisma';

// eslint-disable-next-line node/no-process-env
const { BETTER_AUTH_URL, BETTER_AUTH_SECRET, ALLOWED_ORIGINS } = process.env;

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
    modelName: 'user',
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'user',
        select: false,
        input: false,
      },
    },
  },
});
