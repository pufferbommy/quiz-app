import { NextRequest, NextResponse } from 'next/server';

import { imgSchema } from '@/schemas/joke/img';

import { PrismaClient } from '@prisma/client';

import { Question, StatusMessageDataResponse } from '@/lib/types';

const prisma = new PrismaClient();

export async function GET() {
  const questions = await prisma.image_questions.findMany({
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

  const response = imgSchema.safeParse(json);

  if (!response.success) {
    return NextResponse.json(
      {
        error: { message: response.error },
      },
      {
        status: 400,
      }
    );
  }

  const question = await prisma.image_questions.findFirst({
    where: { id: response.data.questionId },
  });

  const isCorrect = question?.answer === response.data.answer;

  return NextResponse.json(
    {
      message: isCorrect,
      description: isCorrect ? 'ยังไม่พร้อมใช้งาน' : undefined,
    },
    {
      status: 200,
    }
  );
}
