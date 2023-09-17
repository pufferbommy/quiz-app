import { NextRequest, NextResponse } from 'next/server';

import { imgSchema } from '../../../../zodSchema/joke/img';

export async function GET() {
  const mockData = [
    { no: 1, imgPaht: '' },
    { no: 2, imgPaht: '' },
    { no: 3, imgPaht: '' },
    { no: 4, imgPaht: '' },
    { no: 5, imgPaht: '' },
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

  const { no, group, answer } = response.data;

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
