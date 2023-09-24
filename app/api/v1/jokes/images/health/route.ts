import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { imgSchema } from '@/schemas/joke/img';
import { QuestionsData, StatusMessageDataResponse } from '@/lib/types';

const prisma = new PrismaClient();

export async function GET() {
  const questions = await prisma.image_questions.findMany({
    where: { group: 'health' },
    select: { id: true, image_path: true },
  });

  return NextResponse.json<StatusMessageDataResponse<QuestionsData>>(
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

  const parsed = imgSchema.safeParse(json);

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

  const { questionId } = parsed.data;

  const question = await prisma.image_questions.findUnique({
    where: { id: questionId },
  });

  if (question === null) {
    return NextResponse.json({ message: 'ไม่พบข้อที่คุณต้องการตรวจสอบ' }, { status: 404 });
  }

  const isCorrect = question?.answer === parsed.data.answer;

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
