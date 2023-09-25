import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

import { StatusMessageDataResponse, QuestionsData } from '@/lib/types';

const prisma = new PrismaClient();

export async function GET() {
  const questions = await prisma.verse_questions.findMany({ where: { group: 'general' } });

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
