import { NextRequest, NextResponse } from 'next/server';

import { imgSchema } from '@/schemas/joke/img';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  // const mockData = [
  //   { no: 1, imgPath: '/images/image/general/1.jpg' },
  //   { no: 2, imgPath: '/images/image/general/2.jpg' },
  //   { no: 3, imgPath: '/images/image/general/3.jpg' },
  //   { no: 4, imgPath: '/images/image/general/4.jpg' },
  //   { no: 5, imgPath: '/images/image/general/5.jpg' },
  //   { no: 6, imgPath: '/images/image/general/6.jpg' },
  //   { no: 7, imgPath: '/images/image/general/7.jpg' },
  //   { no: 8, imgPath: '/images/image/general/8.jpg' },
  //   { no: 9, imgPath: '/images/image/general/9.jpg' },
  //   { no: 10, imgPath: '/images/image/general/10.jpg' },
  // ];
  const questions = prisma.image_questions.findMany();
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

  const { no, answer } = response.data;

  // const answers = [
  //   {
  //     no: 1,
  //     answer: 'ไก่แก่แม่ปลาช่อน',
  //     meaning: 'หญิงค่อนข้างมีอายุที่มีมารยาและเล่ห์เหลี่ยมมาก',
  //   },
  //   {
  //     no: 2,
  //     answer: 'เป็ดปักกิ่ง',
  //     meaning: 'อาหารจีนเลิศรสที่มีประวัติศาสตร์ยาวนาน และได้ชื่อว่าเป็นหนึ่งในเมนูประจำชาติจีน',
  //   },
  //   {
  //     no: 3,
  //     answer: 'ยื่นแก้วให้วานร',
  //     meaning: 'เอาของมีค่าให้แก่คนที่ไม่รู้จักค่าของสิ่งนั้น',
  //   },
  //   {
  //     no: 4,
  //     answer: 'เห็ดหูหนู',
  //     meaning:
  //       'เป็นเห็ดชนิดน้ำ แผ่นใสนิ่ม (Hood for hushroom) มีสารอาหาร มากมาย เช่น โปรตีน คาร์โบไฮเดรต ใยอาหาร แคลเซียม ฟอสฟอรัส วิตามิน B และ C สารพวกนี้จะช่วย บำรุงเลือด หัวใจ ป้องกันท้องผูก ริดสีดวงทวาร ช่วยลดน้ำตาลในเลือด',
  //   },
  //   {
  //     no: 5,
  //     answer: 'สังข์ทอง',
  //     meaning:
  //       'เดิมทีนั้นเป็นบทเล่นละครในมีมาแต่กรุงสุโขทัย ยังเป็นราชธานี ถึงกรุงรัตนโกสินทร์ ต่อมาในพระบาทสมเด็จพระพุทธเลิศหล้านภาลัยทรงตัด เรื่องสังข์ทองตอนปลาย (ตั้งแต่ตอนพระสังข์หนีนางพันธุรัต) มาทรงพระราชนิพนธ์ ให้ละครหลวงเล่น มีตัวละครที่เป็นรู้จักกันเป็นอย่างดี คือ เจ้าเงาะ ซึ่งคือพระสังข์ กับนางรจนา เนื้อเรื่องมีความสนุกสนานและเป็นที่นิยม',
  //   },
  //   {
  //     no: 6,
  //     answer: 'เขียนเสือให้วัวกลัว',
  //     meaning: 'กระทำการเพื่อให้อีกฝ่ายหนึ่งเสียขวัญหรือเกรงขาม',
  //   },
  //   {
  //     no: 7,
  //     answer: 'ผักชีโรยหน้า',
  //     meaning: 'การทำความดีเพียงผิวเผิน ไม่ได้ทำดีอย่างจริงจังเป็นประจำ หรือสม่ำเสมอ',
  //   },
  //   {
  //     no: 8,
  //     answer: 'เขาวงกต',
  //     meaning: '(เขา+ วงกลมตรงกด)',
  //   },
  //   {
  //     no: 9,
  //     answer: 'ศาสตราจารย์',
  //     meaning:
  //       'คือผู้มีความเชี่ยวชาญในศิลปะวิทยาการเฉพาะด้าน หรือผู้สอนผู้มีความชำนาญระดับสูง ศาสตราจารย์อาจได้รับการคัดเลือกแล้วแต่งตั้งตามตำแหน่งทางวิชาการ หรือมีคุณวุฒิในระดับที่ควรแก่การยกย่อง มีคนในวงการอ้างถึงและยกผลงานให้เป็นทฤษฎี หรือมีผลงานวิจัยที่ส่งผลกระทบโดยกว้าง',
  //   },
  //   {
  //     no: 10,
  //     answer: 'รากผักชี',
  //     meaning:
  //       'เป็นเครื่องเทศที่นิยมนำมาหมักเนื้อสัตว์ เพื่อดับกลิ่นคาวและเพิ่มความหอม โดยเฉพาะอาหารที่ปิ้งย่าง รากผักชียังมีประโยชน์ช่วยไล่พิษไข้เดือด หิด อีสุกใส',
  //   },
  // ];

  const question = await prisma.image_questions.findFirst({ where: { id: no } });

  const isCorrect = answer === question?.answer;

  return NextResponse.json(
    {
      isCorrect,
      answer: isCorrect ? question?.answer : undefined,
      meaning: isCorrect ? question?.meaning : undefined,
    },
    {
      status: 200,
    }
  );
}
