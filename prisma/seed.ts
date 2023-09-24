import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const imageQuestions = [
    {
      id: 1,
      image_path: '/images/image/general/1.jpg',
      answer: 'ไก่แก่แม่ปลาช่อน',
      meaning: 'หญิงค่อนข้างมีอายุที่มีมารยาและเล่ห์เหลี่ยมมาก',
      group: 'general',
    },
    {
      id: 2,
      image_path: '/images/image/general/2.jpg',
      answer: 'เป็ดปักกิ่ง',
      meaning: 'อาหารจีนเลิศรสที่มีประวัติศาสตร์ยาวนาน และได้ชื่อว่าเป็นหนึ่งในเมนูประจำชาติจีน',
      group: 'general',
    },
    {
      id: 3,
      image_path: '/images/image/general/3.jpg',
      answer: 'ยื่นแก้วให้วานร',
      meaning: 'เอาของมีค่าให้แก่คนที่ไม่รู้จักค่าของสิ่งนั้น',
      group: 'general',
    },
    {
      id: 4,
      image_path: '/images/image/general/4.jpg',
      answer: 'เห็ดหูหนู',
      meaning:
        'เป็นเห็ดชนิดน้ำ แผ่นใสนิ่ม (Hood for hushroom) มีสารอาหาร มากมาย เช่น โปรตีน คาร์โบไฮเดรต ใยอาหาร แคลเซียม ฟอสฟอรัส วิตามิน B และ C สารพวกนี้จะช่วย บำรุงเลือด หัวใจ ป้องกันท้องผูก ริดสีดวงทวาร ช่วยลดน้ำตาลในเลือด',
      group: 'general',
    },
    {
      id: 5,
      image_path: '/images/image/general/5.jpg',
      answer: 'สังข์ทอง',
      meaning:
        'เดิมทีนั้นเป็นบทเล่นละครในมีมาแต่กรุงสุโขทัย ยังเป็นราชธานี ถึงกรุงรัตนโกสินทร์ ต่อมาในพระบาทสมเด็จพระพุทธเลิศหล้านภาลัยทรงตัด เรื่องสังข์ทองตอนปลาย (ตั้งแต่ตอนพระสังข์หนีนางพันธุรัต) มาทรงพระราชนิพนธ์ ให้ละครหลวงเล่น มีตัวละครที่เป็นรู้จักกันเป็นอย่างดี คือ เจ้าเงาะ ซึ่งคือพระสังข์ กับนางรจนา เนื้อเรื่องมีความสนุกสนานและเป็นที่นิยม',
      group: 'general',
    },
    {
      id: 6,
      image_path: '/images/image/general/6.jpg',
      answer: 'เขียนเสือให้วัวกลัว',
      meaning: 'กระทำการเพื่อให้อีกฝ่ายหนึ่งเสียขวัญหรือเกรงขาม',
      group: 'general',
    },
    {
      id: 7,
      image_path: '/images/image/general/7.jpg',
      answer: 'ผักชีโรยหน้า',
      meaning: 'การทำความดีเพียงผิวเผิน ไม่ได้ทำดีอย่างจริงจังเป็นประจำ หรือสม่ำเสมอ',
      group: 'general',
    },
    {
      id: 8,
      image_path: '/images/image/general/8.jpg',
      answer: 'เขาวงกต',
      meaning: '(เขา + วงกลมตรงกด)',
      group: 'general',
    },
    {
      id: 9,
      image_path: '/images/image/general/9.jpg',
      answer: 'ศาสตราจารย์',
      meaning:
        'คือผู้มีความเชี่ยวชาญในศิลปะวิทยาการเฉพาะด้าน หรือผู้สอนผู้มีความชำนาญระดับสูง ศาสตราจารย์อาจได้รับการคัดเลือกแล้วแต่งตั้งตามตำแหน่งทางวิชาการ หรือมีคุณวุฒิในระดับที่ควรแก่การยกย่อง มีคนในวงการอ้างถึงและยกผลงานให้เป็นทฤษฎี หรือมีผลงานวิจัยที่ส่งผลกระทบโดยกว้าง',
      group: 'general',
    },
    {
      id: 10,
      image_path: '/images/image/general/10.jpg',
      answer: 'รากผักชี',
      meaning:
        'เป็นเครื่องเทศที่นิยมนำมาหมักเนื้อสัตว์ เพื่อดับกลิ่นคาวและเพิ่มความหอม โดยเฉพาะอาหารที่ปิ้งย่าง รากผักชียังมีประโยชน์ช่วยไล่พิษไข้เดือด หิด อีสุกใส',
      group: 'general',
    },
  ];
  for (const data of imageQuestions) {
    await prisma.image_questions.upsert({
      where: { id: data.id },
      create: data,
      update: data,
    });
  }
  const verseQuestions = [
    {
      id: 1,
      image_path: '/images/verse/general/1.JPG',
      answer: JSON.stringify({
        first: 'ทดสอบ',
        second: 'ทดสอบ',
        third: 'ทดสอบ',
        fourth: 'ทดสอบ',
      }),
      meaning: 'ทดสอบ',
      group: 'general',
    },
    {
      id: 2,
      image_path: '/images/verse/general/2.JPG',
      answer: JSON.stringify({
        first: 'หมู',
        second: 'ไป',
        third: 'ไก่',
        fourth: 'มา',
      }),
      meaning: 'ทดสอบ',
      group: 'general',
    },
    {
      id: 3,
      image_path: '/images/verse/general/3.JPG',
      answer: JSON.stringify({
        first: 'น้ำตา',
        second: 'น้ำชา',
        third: 'น้ำยา',
        fourth: 'น้ำมา',
      }),
      meaning: 'ทดสอบ',
      group: 'general',
    },
    {
      id: 4,
      image_path: '/images/verse/general/4.JPG',
      answer: JSON.stringify({
        first: 'แกว่ง',
        second: 'เท้า',
        third: 'หา',
        fourth: 'เสี้ยน',
      }),
      meaning: 'ทดสอบ',
      group: 'general',
    },
    {
      id: 5,
      image_path: '/images/verse/general/5.JPG',
      answer: JSON.stringify({
        first: 'จับ',
        second: 'ปลา',
        third: 'สอง',
        fourth: 'มือ',
      }),
      meaning: 'ทดสอบ',
      group: 'general',
    },
    {
      id: 6,
      image_path: '/images/verse/general/6.JPG',
      answer: JSON.stringify({
        first: 'ทดสอบ',
        second: 'ทดสอบ',
        third: 'ทดสอบ',
        fourth: 'ทดสอบ',
      }),
      meaning: 'ทดสอบ',
      group: 'general',
    },
    {
      id: 7,
      image_path: '/images/verse/general/7.JPG',
      answer: JSON.stringify({
        first: 'ทดสอบ',
        second: 'ทดสอบ',
        third: 'ทดสอบ',
        fourth: 'ทดสอบ',
      }),
      meaning: 'ทดสอบ',
      group: 'general',
    },
    {
      id: 8,
      image_path: '/images/verse/general/8.JPG',
      answer: JSON.stringify({
        first: 'ทดสอบ',
        second: 'ทดสอบ',
        third: 'ทดสอบ',
        fourth: 'ทดสอบ',
      }),
      meaning: 'ทดสอบ',
      group: 'general',
    },
    {
      id: 9,
      image_path: '/images/verse/general/9.JPG',
      answer: JSON.stringify({
        first: 'คัด',
        second: 'ตึง',
        third: 'ดึง',
        fourth: 'เต้า',
      }),
      meaning: 'ทดสอบ',
      group: 'general',
    },
    {
      id: 10,
      image_path: '/images/verse/general/10.JPG',
      answer: JSON.stringify({
        first: 'น้ำนม',
        second: 'น้ำฝน',
        third: 'น้ำใจ',
        fourth: 'น้ำสุรา',
      }),
      meaning: 'ทดสอบ',
      group: 'general',
    },
  ];
  for (const data of verseQuestions) {
    await prisma.verse_questions.upsert({
      where: { id: data.id },
      create: data,
      update: data,
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
