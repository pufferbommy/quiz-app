import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { StatusMessageDataResponse, QuestionsData } from '@/lib/types';
import { createImgSchema } from '@/schemas/joke/img';

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

  const parsed = createImgSchema.safeParse(json);

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

  const { answer, meaning } = parsed.data;

  const isCreate = await prisma.image_questions.create({
    data: { image_path: 'test', answer: answer, meaning: meaning, group: 'general' },
  });

  return NextResponse.json({ message: isCreate }, { status: 200 });
}
