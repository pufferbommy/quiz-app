import { z } from 'zod';

export const imgSchema = z.object({
  group: z.string(),
  no: z.number(),
  answer: z.string(),
});

export const verseSchema = z.object({
  inputFirst: z.string(),
  inputSecond: z.string(),
  inputThird: z.string(),
  inputFourth: z.string(),
});

export type VerseSchema = z.infer<typeof verseSchema>;
