import Link from 'next/link';

import Title from '@/components/text/title';
import { Button } from '@/components/ui/button';

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
      <Title>วิธีการเล่น</Title>
      <ul className="space-y-4 mb-4">
        {instructions.map((instruction, index) => (
          <li className="bg-secondary rounded-md p-4 text-start" key={index}>
            {instruction}
          </li>
        ))}
      </ul>
      <Link href="/">
        <Button variant="outline" className="w-full">
          ย้อนกลับ
        </Button>
      </Link>
    </>
  );
};

export default HowToPlay;
