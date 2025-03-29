import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string(),
});

export const signUpSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  name: z
    .string()
    .min(3, { message: 'Please enter your name' })
    .max(30, { message: 'Name must be less than 30 characters' })
    // eslint-disable-next-line regexp/use-ignore-case
    .regex(/^[a-zA-Z\s]*$/, { message: 'Name must contain only letters' }),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .refine((val: string) => /[A-Z]/.test(val), 'Password must contain at least one uppercase letter')
      .refine((val: string) => /[0-9]/.test(val), 'Password must contain at least one number'),
    confirmPassword: z.string(),
  })
  .refine((data: { password: string; confirmPassword: string }) => data.password === data.confirmPassword, {
    // eslint-disable-next-line style/quotes
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type SignIn = z.infer<typeof signInSchema>;
export type SignUp = z.infer<typeof signUpSchema>;
