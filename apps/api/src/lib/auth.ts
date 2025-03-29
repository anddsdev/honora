import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

import { resend } from './email';
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
    resetPasswordTokenExpiresIn: 10 * 60, // 10 minutes
    sendResetPassword: async ({ url, user }) => {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: [user.email],
        subject: 'Reset your password',
        html: `
            <div style="max-width: 600px; margin: 0 auto; padding: 30px; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            <h1 style="color: #000000; font-size: 20px; font-weight: 600; margin-top: 0; margin-bottom: 16px;">Reset your password</h1>
            
            <p style="color: #333333; font-size: 16px; margin-bottom: 24px;">
              Click the button below to reset your password.
            </p>
            
            <div style="margin-bottom: 24px;">
              <a href="${url}" style="display: inline-block; background-color: #000000; color: white; font-weight: 500; text-decoration: none; padding: 10px 20px; border-radius: 4px;">
                Reset password
              </a>
            </div>
            
            <p style="color: #666666; font-size: 14px; margin-bottom: 12px;">
              If you didn't request a password reset, you can ignore this email.
            </p>
            
            <p style="color: #666666; font-size: 14px; margin-bottom: 12px;">
              Your password won't change until you access the link above and create a new one.
            </p>
            
            <p style="color: #666666; font-size: 14px; margin-bottom: 0;">
              This link will expire in 10 minutes.
            </p>
          </div>
          `,
      });
    },
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
