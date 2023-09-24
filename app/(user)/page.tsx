import Link from 'next/link';

import Title from '@/components/text/title';
import { Button } from '@/components/ui/button';
import { categories } from '@/constants/categories';
import Image from 'next/image';

const User = () => {
  return (
    <>
      <div className="relative w-[50%] translate-x-4 mb-8 mx-auto aspect-square">
        <Image src="/logo.png" alt="" fill />
      </div>
      <Title>โจ๊กปริศนา</Title>
      <div className="flex flex-col gap-4">
        {categories.map(({ nameThai, nameEng }) => (
          <Link key={nameEng} href={`/categories/${nameEng}`}>
            <Button className="w-full" variant="outline">
              หมวด{nameThai}
            </Button>
          </Link>
        ))}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/settings">
            <Button className="w-full" variant="outline">
              การตั้งค่า
            </Button>
          </Link>
          <Link href="/how-to-play">
            <Button className="w-full" variant="outline">
              วิธีการเล่น
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default User;
