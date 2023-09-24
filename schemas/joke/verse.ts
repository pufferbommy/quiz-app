import { z } from 'zod';

export const verseSchema = z.object({
  questionId: z.number(),
  inputFirst: z.string(),
  inputSecond: z.string(),
  inputThird: z.string(),
  inputFourth: z.string(),
});

export type VerseSchema = z.infer<typeof verseSchema>;
