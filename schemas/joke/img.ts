import { z } from 'zod';

export const imgSchema = z.object({
  questionId: z.number(),
  answer: z.string(),
});

export const createImgSchema = z.object({
  answer: z.string(),
  meaning: z.string(),
});

export type ImgSchema = z.infer<typeof imgSchema>;
export type createImgSchema = z.infer<typeof createImgSchema>;
