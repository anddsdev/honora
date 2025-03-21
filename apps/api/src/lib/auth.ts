import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from './prisma';

const { BETTER_AUTH_URL, BETTER_AUTH_SECRET, ALLOWED_ORIGINS } = process.env;

export const auth = betterAuth({
  baseURL: BETTER_AUTH_URL || 'http://localhost:3000',
  secret: BETTER_AUTH_SECRET || 'secret',
  allowedOrigins: JSON.parse(ALLOWED_ORIGINS || '[]'),
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
        required: false,
        defaultValue: 'user',
        input: false,
      },
    },
    modelName: 'user',
    fields: {
      emailVerified: 'email_verified',
    },
  },
  session: {
    modelName: 'session',
    fields: {
      userId: 'user_id',
      expiresAt: 'expires_at',
      ipAddress: 'ip_address',
      userAgent: 'user_agent',
    },
  },
  account: {
    modelName: 'account',
    fields: {
      userId: 'user_id',
      accountId: 'account_id',
      providerId: 'provider_id',
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
      accessTokenExpiresAt: 'access_token_expires_at',
      refreshTokenExpiresAt: 'refresh_token_expires_at',
      idToken: 'id_token',
    },
  },
  verification: {
    modelName: 'verification',
    fields: {
      expiresAt: 'expires_at',
    },
  },
});
