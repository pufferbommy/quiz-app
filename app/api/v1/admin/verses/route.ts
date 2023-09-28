import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { StatusMessageResponse } from '@/lib/types';

const prisma = new PrismaClient();

export async function DELETE(request: NextRequest) {
  const questionId = request.nextUrl.searchParams.get('questionId');
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
  await prisma.verse_questions.delete({
    where: { id: parseInt(questionId) },
  });
  return NextResponse.json<StatusMessageResponse>(
    {
      status: 'success',
      message: 'ลบข้อมูลสำเร็จ',
    },
    {
      status: 200,
    }
  );
}
