import { z } from 'zod';

export const imageQuestionSchema = z.object({
  imagePath: z.string(),
  answer: z.string().nonempty('กรุณากรอกคำตอบ'),
  meaning: z.string(),
});

export const verseQuestionSchema = z.object({
  imagePath: z.string(),
  answer: z.object({
    first: z.string().nonempty('กรุณากรอกคำตอบ'),
    second: z.string().nonempty('กรุณากรอกคำตอบ'),
    third: z.string().nonempty('กรุณากรอกคำตอบ'),
    fourth: z.string().nonempty('กรุณากรอกคำตอบ'),
  }),
  meaning: z.string(),
});

export type ImageQuestionSchema = z.infer<typeof imageQuestionSchema>;
export type VerseQuestionSchema = z.infer<typeof verseQuestionSchema>;
