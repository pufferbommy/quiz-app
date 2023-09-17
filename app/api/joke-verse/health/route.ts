import { NextRequest, NextResponse } from 'next/server';

import { verseSchema } from '../../../../zodSchema/joke/verse';

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

  const response = verseSchema.safeParse(json);

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

  const { inputFirst, inputSecond, inputThird, inputFourth } = response.data;

  const mockAnswer = {
    first: 'หมู',
    second: 'หมา',
    third: 'กา',
    fourth: 'ไก่',
  };

  const isCorrect = () => {
    const isEmptyAnswer =
      inputFirst == '' ||
      inputSecond === '' ||
      inputThird === '' ||
      inputFourth === '';

    const isCorrectAnswer =
      inputFirst === mockAnswer.first &&
      inputSecond === mockAnswer.second &&
      inputThird === mockAnswer.third &&
      inputFourth === mockAnswer.fourth;

    if (isEmptyAnswer) {
      return NextResponse.json(
        {
          message: 'Not found your answer',
        },
        {
          status: 404,
        }
      );
    }

    if (isCorrectAnswer) {
      return NextResponse.json(
        {
          message: true,
          description: 'คำอธิบายโจ๊ก',
        },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        {
          message: false,
        },
        {
          status: 200,
        }
      );
    }
  };

  return isCorrect();
}
