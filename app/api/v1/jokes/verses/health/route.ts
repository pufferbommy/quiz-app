import { NextRequest, NextResponse } from 'next/server';

import { verseSchema } from '@/schemas/joke/verse';

export async function GET() {
  const mockData = [
    { no: 1, imgPath: '/images/verse/health/1.JPG' },
    { no: 2, imgPath: '/images/verse/health/2.JPG' },
    { no: 3, imgPath: '/images/verse/health/3.JPG' },
    { no: 4, imgPath: '/images/verse/health/4.JPG' },
    { no: 5, imgPath: '/images/verse/health/5.JPG' },
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
    first: 'ทดสอบ',
    second: 'ทดสอบ',
    third: 'ทดสอบ',
    fourth: 'ทดสอบ',
  };

  const isCorrect = () => {
    const isEmptyAnswer =
      inputFirst == '' || inputSecond === '' || inputThird === '' || inputFourth === '';

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
          description: 'ยังไม่พร้อมใช้งาน',
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
