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

export type SignIn = z.infer<typeof signInSchema>;
export type SignUp = z.infer<typeof signUpSchema>;
