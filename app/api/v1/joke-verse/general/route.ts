import { NextRequest, NextResponse } from 'next/server';

import { verseSchema } from '../../../../../schemas/joke/verse';

export async function GET() {
  const mockData = [
    { no: 1, imgPath: '/images/verse/general/01.JPG' },
    { no: 2, imgPath: '/images/verse/general/02.JPG' },
    { no: 3, imgPath: '/images/verse/general/03.JPG' },
    { no: 4, imgPath: '/images/verse/general/04.JPG' },
    { no: 5, imgPath: '/images/verse/general/05.JPG' },
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

  const { no, inputFirst, inputSecond, inputThird, inputFourth } =
    response.data;

  const mockAnswers = [
    {
      no: 1,
      ans: {
        first: 'ทดสอบ',
        second: 'ทดสอบ',
        third: 'ทดสอบ',
        fourth: 'ทดสอบ',
      },
    },
    {
      no: 2,
      ans: {
        first: 'หมู',
        second: 'ไป',
        third: 'ไก่',
        fourth: 'มา',
      },
    },
    {
      no: 3,
      ans: {
        first: 'ทดสอบ',
        second: 'ทดสอบ',
        third: 'ทดสอบ',
        fourth: 'ทดสอบ',
      },
    },
    {
      no: 4,
      ans: {
        first: 'แกว่ง',
        second: 'เท้า',
        third: 'หา',
        fourth: 'เสี้ยน',
      },
    },
    {
      no: 5,
      ans: {
        first: 'จับ',
        second: 'หี',
        third: 'สอง',
        fourth: 'มือ',
      },
    },
  ];

  const matchingItem = mockAnswers.find((element) => {
    return element.no === no;
  });

  const isCorrect = () => {
    const isEmptyAnswer =
      inputFirst == '' ||
      inputSecond === '' ||
      inputThird === '' ||
      inputFourth === '';

    const isCorrectAnswer =
      matchingItem?.ans.first === inputFirst &&
      matchingItem?.ans.second === inputSecond &&
      matchingItem?.ans.third === inputThird &&
      matchingItem?.ans.fourth === inputFourth;

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
          answer: matchingItem.ans,
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
