import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.image_questions.createMany({
    data: [
      {
        image_path: '/images/image/general/1.jpg',
        answer: 'ไก่แก่แม่ปลาช่อน',
        meaning: 'หญิงค่อนข้างมีอายุที่มีมารยาและเล่ห์เหลี่ยมมาก',
      },
      {
        image_path: '/images/image/general/2.jpg',
        answer: 'เป็ดปักกิ่ง',
        meaning: 'อาหารจีนเลิศรสที่มีประวัติศาสตร์ยาวนาน และได้ชื่อว่าเป็นหนึ่งในเมนูประจำชาติจีน',
      },
      {
        image_path: '/images/image/general/3.jpg',
        answer: 'ยื่นแก้วให้วานร',
        meaning: 'เอาของมีค่าให้แก่คนที่ไม่รู้จักค่าของสิ่งนั้น',
      },
      {
        image_path: '/images/image/general/4.jpg',
        answer: 'เห็ดหูหนู',
        meaning:
          'เป็นเห็ดชนิดน้ำ แผ่นใสนิ่ม (Hood for hushroom) มีสารอาหาร มากมาย เช่น โปรตีน คาร์โบไฮเดรต ใยอาหาร แคลเซียม ฟอสฟอรัส วิตามิน B และ C สารพวกนี้จะช่วย บำรุงเลือด หัวใจ ป้องกันท้องผูก ริดสีดวงทวาร ช่วยลดน้ำตาลในเลือด',
      },
      {
        image_path: '/images/image/general/5.jpg',
        answer: 'สังข์ทอง',
        meaning:
          'เดิมทีนั้นเป็นบทเล่นละครในมีมาแต่กรุงสุโขทัย ยังเป็นราชธานี ถึงกรุงรัตนโกสินทร์ ต่อมาในพระบาทสมเด็จพระพุทธเลิศหล้านภาลัยทรงตัด เรื่องสังข์ทองตอนปลาย (ตั้งแต่ตอนพระสังข์หนีนางพันธุรัต) มาทรงพระราชนิพนธ์ ให้ละครหลวงเล่น มีตัวละครที่เป็นรู้จักกันเป็นอย่างดี คือ เจ้าเงาะ ซึ่งคือพระสังข์ กับนางรจนา เนื้อเรื่องมีความสนุกสนานและเป็นที่นิยม',
      },
      {
        image_path: '/images/image/general/6.jpg',
        answer: 'เขียนเสือให้วัวกลัว',
        meaning: 'กระทำการเพื่อให้อีกฝ่ายหนึ่งเสียขวัญหรือเกรงขาม',
      },
      {
        image_path: '/images/image/general/7.jpg',
        answer: 'ผักชีโรยหน้า',
        meaning: 'การทำความดีเพียงผิวเผิน ไม่ได้ทำดีอย่างจริงจังเป็นประจำ หรือสม่ำเสมอ',
      },
      {
        image_path: '/images/image/general/8.jpg',
        answer: 'เขาวงกต',
        meaning: '(เขา + วงกลมตรงกด)',
      },
      {
        image_path: '/images/image/general/9.jpg',
        answer: 'ศาสตราจารย์',
        meaning:
          'คือผู้มีความเชี่ยวชาญในศิลปะวิทยาการเฉพาะด้าน หรือผู้สอนผู้มีความชำนาญระดับสูง ศาสตราจารย์อาจได้รับการคัดเลือกแล้วแต่งตั้งตามตำแหน่งทางวิชาการ หรือมีคุณวุฒิในระดับที่ควรแก่การยกย่อง มีคนในวงการอ้างถึงและยกผลงานให้เป็นทฤษฎี หรือมีผลงานวิจัยที่ส่งผลกระทบโดยกว้าง',
      },
      {
        image_path: '/images/image/general/10.jpg',
        answer: 'รากผักชี',
        meaning:
          'เป็นเครื่องเทศที่นิยมนำมาหมักเนื้อสัตว์ เพื่อดับกลิ่นคาวและเพิ่มความหอม โดยเฉพาะอาหารที่ปิ้งย่าง รากผักชียังมีประโยชน์ช่วยไล่พิษไข้เดือด หิด อีสุกใส',
      },
    ],
  });
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
