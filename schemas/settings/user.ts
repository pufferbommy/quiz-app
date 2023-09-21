import { z } from 'zod';

export const userSchema = z.object({
  username: z.string(),
});

export type UserSchema = z.infer<typeof userSchema>;
