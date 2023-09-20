import { NextRequest, NextResponse } from 'next/server';

import { imgSchema } from '@/schemas/joke/img';

export async function GET() {
  const mockData = [
    { no: 1, imgPath: '/images/image/health/1.jpg' },
    { no: 2, imgPath: '/images/image/health/2.jpg' },
    { no: 3, imgPath: '/images/image/health/3.jpg' },
    { no: 4, imgPath: '/images/image/health/4.jpg' },
    { no: 5, imgPath: '/images/image/health/5.jpg' },
  ];
  return NextResponse.json({ mockData }, { status: 200 });
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

  const { answer } = response.data;

  const mockAnswer = 'ทดสอบ';
  const isCorrect = answer === mockAnswer;

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
