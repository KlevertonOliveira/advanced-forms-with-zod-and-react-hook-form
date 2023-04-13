import { z } from 'zod';

export const createUserFormSchema = z
  .object({
    name: z
      .string()
      .nonempty('Name is required')
      .transform((name) => {
        return name
          .trim()
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase().concat(word.slice(1)))
          .join(' ');
      }),
    age: z.coerce.number().min(0).max(130),
    email: z
      .string()
      .nonempty('Email is required')
      .email('Invalid e-mail format')
      .toLowerCase()
      .refine(
        (email) => email.endsWith('@teste.com'),
        `E-mail must be from teste's domain`
      ),
    password: z
      .string()
      .nonempty('Password is required')
      .min(8, 'Password must have at least 8 characters'),
    confirmPassword: z
      .string()
      .nonempty('Confirm Password is required')
      .min(8, 'Password must have at least 8 characters'),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });
