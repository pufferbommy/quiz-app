import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { verseQuestionSchema } from '@/schemas/joke/question';
import { StatusMessageDataResponse, QuestionsData, StatusMessageResponse } from '@/lib/types';

const prisma = new PrismaClient();

export async function GET() {
  const questions = await prisma.verse_questions.findMany({ where: { group: 'health' } });

  return NextResponse.json<StatusMessageDataResponse<QuestionsData>>(
    {
      status: 'success',
      message: 'Get all questions successfully',
      data: {
        questions: questions.map(({ id, image_path, answer }) => ({
          id,
          imagePath: image_path,
          answer: JSON.parse(answer),
        })),
      },
    },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  const json = await request.json();

  const parsed = verseQuestionSchema.safeParse(json);

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

  const { imagePath, answer, meaning } = parsed.data;

  const question = await prisma.verse_questions.create({
    data: { image_path: imagePath, answer: JSON.stringify(answer), meaning, group: 'health' },
  });

  if (question) {
    return NextResponse.json<StatusMessageResponse>(
      {
        status: 'success',
        message: 'สร้างคำถามสำเร็จ',
      },
      { status: 200 }
    );
  } else {
    return NextResponse.json<StatusMessageResponse>(
      {
        status: 'error',
        message: 'สร้างคำถามไม่สำเร็จ',
      },
      { status: 400 }
    );
  }
}
