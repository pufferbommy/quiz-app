import Link from 'next/link';

import { Button } from '../../components/ui/button';

const HowToPlay = () => {
  const instructions = [
    'การพิมพ์คำตอบโจ๊กภาพและโจ๊กปริศนาสามารถพิมพ์ได้ที่ช่องว่างใต้ภาพปริศนา',
    'หากตอบคำถามถูกต้องจะมีคำเฉลยและคำอธิบายความหมายของข้อนั้นๆและเปลี่ยนเป็นคำถามข้อถัดไปได้',
    "หากไม่สามารถตอบคำถามหรืออยากข้ามคำถามข้อนั้น สามารถกดคำว่า 'ถัดไป' เพื่อไปคำถามข้อต่อไป",
    'หากไม่สามารถตอบคำถามโจ๊กภาพและโจ๊กปริศนาได้จะไม่เฉลยคำตอบของข้อนั้นๆ',
    'ผู้เล่นสามารถเล่นได้โดยไม่จำกัดเวลาในแต่ละข้อ',
  ];

  return (
    <>
      <h1 className="text-4xl mb-8 text-center">วิธีการเล่น</h1>
      <ul className="space-y-4 mb-8">
        {instructions.map((instruction, index) => (
          <li key={index}>
            <span className="mr-2">{index + 1}.</span>
            {instruction}
          </li>
        ))}
      </ul>
      <Link href="/">
        <Button className="w-full">ย้อนกลับ</Button>
      </Link>
    </>
  );
};

export default HowToPlay;
