import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { imgSchema } from '@/schemas/joke/img';
import { Question, StatusMessageDataResponse } from '@/lib/types';

const prisma = new PrismaClient();

export async function GET() {
  const questions = await prisma.image_questions.findMany({
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

  const parsedRequest = imgSchema.safeParse(json);

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

  const { questionId, answer } = parsedRequest.data;

  const question = await prisma.image_questions.findFirst({ where: { id: questionId } });

  const isCorrect = answer === question?.answer;

  return NextResponse.json(
    {
      isCorrect,
      answer: isCorrect ? question?.answer : undefined,
      meaning: isCorrect ? question?.meaning : undefined,
    },
    {
      status: 200,
    }
  );
}
