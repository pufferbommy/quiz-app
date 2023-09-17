import { NextRequest, NextResponse } from 'next/server';

import { imgSchema } from '../../../../../schemas/joke/img';

export async function GET() {
  const mockData = [
    { no: 1, imgPath: '' },
    { no: 2, imgPath: '' },
    { no: 3, imgPath: '' },
    { no: 4, imgPath: '' },
    { no: 5, imgPath: '' },
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

  const mockAnswer = 'ม้าขี่หมู';

  const isCorrect = answer === mockAnswer;

  return NextResponse.json(
    {
      message: isCorrect,
      description: isCorrect ? 'คำอธิบายโจ๊ก' : undefined,
    },
    {
      status: 200,
    }
  );
}
