import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

import { StatusMessageDataResponse, QuestionsData } from '@/lib/types';

const prisma = new PrismaClient();

export async function GET() {
  const questions = await prisma.image_questions.findMany({ where: { group: 'health' } });

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
