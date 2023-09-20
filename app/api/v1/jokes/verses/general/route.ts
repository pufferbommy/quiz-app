import { NextRequest, NextResponse } from 'next/server';

import { verseSchema } from '../../../../../../schemas/joke/verse';

export async function GET() {
  const mockData = [
    { no: 1, imgPath: '/images/verse/general/01.JPG' },
    { no: 2, imgPath: '/images/verse/general/02.JPG' },
    { no: 3, imgPath: '/images/verse/general/03.JPG' },
    { no: 4, imgPath: '/images/verse/general/04.JPG' },
    { no: 5, imgPath: '/images/verse/general/05.JPG' },
    { no: 6, imgPath: '/images/verse/general/06.JPG' },
    { no: 7, imgPath: '/images/verse/general/07.JPG' },
    { no: 8, imgPath: '/images/verse/general/08.JPG' },
    { no: 9, imgPath: '/images/verse/general/09.JPG' },
    { no: 10, imgPath: '/images/verse/general/10.JPG' },
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

  const { no, inputFirst, inputSecond, inputThird, inputFourth } = response.data;

  const mockAnswers = [
    {
      no: 1,
      answer: {
        first: 'ทดสอบ',
        second: 'ทดสอบ',
        third: 'ทดสอบ',
        fourth: 'ทดสอบ',
      },
    },
    {
      no: 2,
      answer: {
        first: 'หมู',
        second: 'ไป',
        third: 'ไก่',
        fourth: 'มา',
      },
    },
    {
      no: 3,
      answer: {
        first: 'น้ำตา',
        second: 'น้ำชา',
        third: 'น้ำยา',
        fourth: 'น้ำมา',
      },
    },
    {
      no: 4,
      answer: {
        first: 'แกว่ง',
        second: 'เท้า',
        third: 'หา',
        fourth: 'เสี้ยน',
      },
    },
    {
      no: 5,
      answer: {
        first: 'จับ',
        second: 'ปลา',
        third: 'สอง',
        fourth: 'มือ',
      },
    },
    {
      no: 6,
      answer: {
        first: 'ทดสอบ',
        second: 'ทดสอบ',
        third: 'ทดสอบ',
        fourth: 'ทดสอบ',
      },
    },
    {
      no: 7,
      answer: {
        first: 'ทดสอบ',
        second: 'ทดสอบ',
        third: 'ทดสอบ',
        fourth: 'ทดสอบ',
      },
    },
    {
      no: 8,
      answer: {
        first: 'ทดสอบ',
        second: 'ทดสอบ',
        third: 'ทดสอบ',
        fourth: 'ทดสอบ',
      },
    },
    {
      no: 9,
      answer: {
        first: 'คัด',
        second: 'ตึง',
        third: 'ดึง',
        fourth: 'เต้า',
      },
    },
    {
      no: 10,
      answer: {
        first: 'น้ำนม',
        second: 'น้ำฝน',
        third: 'น้ำใจ',
        fourth: 'น้ำสุรา',
      },
    },
  ];

  const matchingItem = mockAnswers.find(element => {
    return element.no === no;
  });

  const isCorrect = () => {
    const answer = matchingItem?.answer;
    return (
      answer?.first === inputFirst &&
      answer?.second === inputSecond &&
      answer?.third === inputThird &&
      answer?.fourth === inputFourth
    );
  };

  return NextResponse.json(
    {
      isCorrect: isCorrect(),
      answer: isCorrect() ? matchingItem?.answer : undefined,
      meaning: isCorrect() ? 'ยังไม่พร้อมใช้งาน' : undefined,
    },
    {
      status: 200,
    }
  );
}
