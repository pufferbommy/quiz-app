import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { AdminQuestionData, StatusMessageDataResponse, StatusMessageResponse } from '@/lib/types';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get('category');
  const questionId = request.nextUrl.searchParams.get('questionId');

  if (!category || !['image', 'verse'].includes(category)) {
    return NextResponse.json<StatusMessageResponse>(
      {
        status: 'error',
        message: 'Missing category',
      },
      {
        status: 400,
      }
    );
  }

  if (!questionId) {
    return NextResponse.json<StatusMessageResponse>(
      {
        status: 'error',
        message: 'Missing questionId',
      },
      {
        status: 400,
      }
    );
  }

  let question;

  if (category === 'image') {
    question = await prisma.image_questions.findUnique({
      where: { id: parseInt(questionId) },
    });
  } else {
    question = await prisma.verse_questions.findUnique({
      where: { id: parseInt(questionId) },
    });
  }

  if (!question) {
    return NextResponse.json<StatusMessageResponse>(
      {
        status: 'error',
        message: 'ไม่พบข้อมูล',
      },
      {
        status: 404,
      }
    );
  }

  const { id, image_path, answer, meaning, group } = question;

  return NextResponse.json<StatusMessageDataResponse<AdminQuestionData>>(
    {
      status: 'success',
      message: 'ดึงข้อมูลสำเร็จ',
      data: {
        question: {
          id,
          imagePath: image_path,
          answer: category === 'image' ? answer : JSON.parse(answer),
          meaning,
          category,
          subCategory: group,
        },
      },
    },
    {
      status: 200,
    }
  );
}
