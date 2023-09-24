import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { verseSchema } from '@/schemas/joke/verse';
import { Question, StatusMessageDataResponse, VerseAnswer } from '@/lib/types';

const prisma = new PrismaClient();

export async function GET() {
  const questions = await prisma.verse_questions.findMany({
    where: { group: 'health' },
    select: { id: true, image_path: true },
  });
  return NextResponse.json<StatusMessageDataResponse<{ questions: Question[] }>>(
    {
      status: 'success',
      message: 'Get all questions successfully',
      data: {
        questions: questions.map(({ id, image_path }) => ({
          id,
          imagePath: image_path,
        })),
      },
    },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  const json = await request.json();

  const parsed = verseSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: { message: parsed.error },
      },
      {
        status: 400,
      }
    );
  }

  const { questionId, inputFirst, inputSecond, inputThird, inputFourth } = parsed.data;

  const question = await prisma.verse_questions.findUnique({ where: { id: questionId } });

  if (question === null) {
    return NextResponse.json({ message: 'ไม่พบข้อที่คุณต้องการตรวจสอบ' }, { status: 404 });
  }

  const answer: VerseAnswer = JSON.parse(question.answer);

  const isCorrect = () => {
    return (
      inputFirst === answer.first &&
      inputSecond === answer.second &&
      inputThird === answer.third &&
      inputFourth === answer.fourth
    );
  };

  return NextResponse.json(
    {
      isCorrect: isCorrect(),
      answer: isCorrect() ? answer : undefined,
      meaning: isCorrect() ? question.meaning : undefined,
    },
    {
      status: 200,
    }
  );
}
