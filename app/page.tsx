import Link from 'next/link';
import React from 'react';

import { Button } from '../components/ui/button';

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
      <h1 className="text-4xl mb-8 text-center">โจ๊กปริศนา</h1>
      <div className="w-full flex flex-col gap-4">
        {categories.map(({ name, path }) => (
          <Link key={name} href={path}>
            <Button className="w-full" variant="outline">
              {name}
            </Button>
          </Link>
        ))}
        <Button disabled variant="outline">
          อันดับประจำสัปดาห์
        </Button>
        <div className="grid grid-cols-2 gap-4">
          {/* <Link href="/settings"> */}
          <Button disabled className="w-full" variant="outline">
            การตั้งค่า
          </Button>
          {/* </Link> */}
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
