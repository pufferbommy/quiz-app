import { z } from 'zod';

export const imgSchema = z.object({
  questionId: z.number(),
  answer: z.string(),
});

export type ImgSchema = z.infer<typeof imgSchema>;
