import Link from 'next/link';

import Title from '@/components/text/title';
import { Button } from '@/components/ui/button';

const Page = () => {
  const categories = [
    {
      name: 'หมวดกลอน',
      path: '/categories/verse',
    },
    {
      name: 'หมวดภาพ',
      path: '/categories/image',
    },
  ];

  return (
    <>
      <Title>โจ๊กปริศนา</Title>
      <div className="flex flex-col gap-4">
        {categories.map(({ name, path }) => (
          <Link key={name} href={path}>
            <Button className="w-full" variant="outline">
              {name}
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

export default Page;
