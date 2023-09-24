import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { verseSchema } from '@/schemas/joke/verse';
import { Question, StatusMessageDataResponse, VerseAnswer } from '@/lib/types';

const prisma = new PrismaClient();

export async function GET() {
  const questions = await prisma.verse_questions.findMany({
    where: {
      group: 'general',
    },
    select: {
      id: true,
      image_path: true,
    },
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

  const parsedRequest = verseSchema.safeParse(json);

  if (!parsedRequest.success) {
    return NextResponse.json(
      {
        error: { message: parsedRequest.error },
      },
      {
        status: 400,
      }
    );
  }

  const { questionId, inputFirst, inputSecond, inputThird, inputFourth } = parsedRequest.data;

  const question = await prisma.verse_questions.findFirst({ where: { id: questionId } });

  if (question === null) {
    return NextResponse.json({ message: 'ไม่พบข้อที่คุณต้องการ' }, { status: 404 });
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
      meaning: isCorrect() ? 'ยังไม่พร้อมใช้งาน' : undefined,
    },
    {
      status: 200,
    }
  );
}
