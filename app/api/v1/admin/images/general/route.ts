import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { imageQuestionSchema } from '@/schemas/joke/question';
import { StatusMessageDataResponse, QuestionsData, StatusMessageResponse } from '@/lib/types';

const prisma = new PrismaClient();

export async function GET() {
  const questions = await prisma.image_questions.findMany({ where: { group: 'general' } });

  return NextResponse.json<StatusMessageDataResponse<QuestionsData>>(
    {
      status: 'success',
      message: 'Get all questions successfully',
      data: {
        questions: questions.map(({ id, image_path, answer }) => ({
          id,
          imagePath: image_path,
          answer,
        })),
      },
    },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  const json = await request.json();

  const parsed = imageQuestionSchema.safeParse(json);

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

  const question = await prisma.image_questions.create({
    data: { image_path: imagePath, answer, meaning, group: 'general' },
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
