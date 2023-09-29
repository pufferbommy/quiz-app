import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

import { verseQuestionSchema } from '@/schemas/joke/question';
import { StatusMessageDataResponse, AdminQuestionsData, StatusMessageResponse } from '@/lib/types';

const prisma = new PrismaClient();

export async function GET() {
  const questions = await prisma.verse_questions.findMany({ where: { group: 'general' } });

  return NextResponse.json<StatusMessageDataResponse<AdminQuestionsData>>(
    {
      status: 'success',
      message: 'Get all questions successfully',
      data: {
        questions: questions.map(({ id, image_path, answer, meaning, group }) => ({
          id,
          imagePath: image_path,
          answer: JSON.parse(answer),
          meaning,
          category: 'verse',
          subCategory: group,
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
    data: { image_path: imagePath, answer: JSON.stringify(answer), meaning, group: 'general' },
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

export async function PUT(request: NextRequest) {
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

  const questionId = request.nextUrl.searchParams.get('questionId');

  if (!questionId) {
    return NextResponse.json<StatusMessageResponse>(
      {
        status: 'error',
        message: 'ไม่พบคำถาม',
      },
      { status: 400 }
    );
  }

  const { imagePath, answer, meaning } = parsed.data;

  const question = await prisma.verse_questions.update({
    where: { id: parseInt(questionId) },
    data: { image_path: imagePath, answer: JSON.stringify(answer), meaning, group: 'general' },
  });

  if (question) {
    return NextResponse.json<StatusMessageResponse>(
      {
        status: 'success',
        message: 'แก้ไขคำถามสำเร็จ',
      },
      { status: 200 }
    );
  } else {
    return NextResponse.json<StatusMessageResponse>(
      {
        status: 'error',
        message: 'แก้ไขคำถามไม่สำเร็จ',
      },
      { status: 400 }
    );
  }
}
