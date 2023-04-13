import { z } from 'zod';
import { createUserFormSchema } from '../schemas/createUserFormSchema';

export type CreateUserFormData = z.infer<typeof createUserFormSchema>;
