import { NextRequest, NextResponse } from 'next/server';

import { imgSchema } from '../../../../../schemas/joke/img';

export async function GET() {
  const mockData = [
    { no: 1, imgPath: '/images/image/general/1.jpg' },
    { no: 2, imgPath: '/images/image/general/2.jpg' },
    { no: 3, imgPath: '/images/image/general/3.jpg' },
    { no: 4, imgPath: '/images/image/general/4.jpg' },
    { no: 5, imgPath: '/images/image/general/5.jpg' },
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

  const { no, answer } = response.data;

  const answers = [
    {
      no: 1,
      answer: 'ไก่แก่แม่ปลาช่อน',
      meaning: 'หญิงค่อนข้างมีอายุที่มีมารยาและเล่ห์เหลี่ยมมาก',
    },
    {
      no: 2,
      answer: 'เป็ดปักกิ่ง',
      meaning:
        'อาหารจีนเลิศรสที่มีประวัติศาสตร์ยาวนาน และได้ชื่อว่าเป็นหนึ่งในเมนูประจำชาติจีน',
    },
    {
      no: 3,
      answer: 'ยื่นแก้วให้วานร',
      meaning: 'เอาของมีค่าให้แก่คนที่ไม่รู้จักค่าของสิ่งนั้น',
    },
    {
      no: 4,
      answer: 'เห็ดหูหนู',
      meaning:
        'เป็นเห็ดชนิดน้ำ แผ่นใสนิ่ม (Hood for hushroom) มีสารอาหาร มากมาย เช่น โปรตีน คาร์โบไฮเดรต ใยอาหาร แคลเซียม ฟอสฟอรัส วิตามิน B และ C สารพวกนี้จะช่วย บำรุงเลือด หัวใจ ป้องกันท้องผูก ริดสีดวงทวาร ช่วยลดน้ำตาลในเลือด',
    },
    {
      no: 5,
      answer: 'สังข์ทอง',
      meaning:
        'เดิมทีนั้นเป็นบทเล่นละครในมีมาแต่กรุงสุโขทัย ยังเป็นราชธานี ถึงกรุงรัตนโกสินทร์ ต่อมาในพระบาทสมเด็จพระพุทธเลิศหล้านภาลัยทรงตัด เรื่องสังข์ทองตอนปลาย (ตั้งแต่ตอนพระสังข์หนีนางพันธุรัต) มาทรงพระราชนิพนธ์ ให้ละครหลวงเล่น มีตัวละครที่เป็นรู้จักกันเป็นอย่างดี คือ เจ้าเงาะ ซึ่งคือพระสังข์ กับนางรจนา เนื้อเรื่องมีความสนุกสนานและเป็นที่นิยม',
    },
  ];

  const matchingItem = answers.find((e) => {
    return e.no === no;
  });

  const isCorrect = answer === matchingItem?.answer;

  return NextResponse.json(
    {
      isCorrect,
      answer: isCorrect ? matchingItem?.answer : undefined,
      meaning: isCorrect ? matchingItem.meaning : undefined,
    },
    {
      status: 200,
    }
  );
}
