import { z } from 'zod';

export const imgSchema = z.object({
  group: z.string(),
  no: z.number(),
  answer: z.string(),
});

export type ImgSchema = z.infer<typeof imgSchema>;
