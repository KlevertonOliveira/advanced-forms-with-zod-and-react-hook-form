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
    techs: z
      .array(
        z.object({
          title: z.string().nonempty('Title is required'),
          workload: z.coerce.number().min(20).max(60),
        })
      )
      .min(2, 'Must have at least 2 techs')
      .refine((techs) => {
        return techs.some((tech) => tech.workload > 50);
      }, 'You must have at least 1 technology with workload above 50'),
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
