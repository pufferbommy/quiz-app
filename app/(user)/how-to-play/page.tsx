import Link from 'next/link';

import Title from '@/components/text/title';
import { Button } from '@/components/ui/button';
import { instructions } from '@/constants/instructions';

const HowToPlay = () => {
  return (
    <>
      <Title>วิธีการเล่น</Title>
      <ul className="space-y-4 mb-4">
        {instructions.map((instruction, index) => (
          <li key={index} className="bg-secondary rounded-md p-4 text-start">
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
