import { NextRequest, NextResponse } from 'next/server';

import { imgSchema } from '@/schemas/joke/img';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const questions = await prisma.image_questions.findMany();

  return NextResponse.json({ questions }, { status: 200 });
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

  const question = await prisma.image_questions.findFirst({ where: { id: response.data.no } });

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
