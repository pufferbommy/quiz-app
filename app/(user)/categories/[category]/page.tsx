import Link from 'next/link';

import Title from '@/components/text/title';
import { Button } from '@/components/ui/button';

const Category = ({ params }: { params: { category: string } }) => {
  const { category } = params;

  const subCategories = [
    {
      name: 'หมวดสุขภาพ',
      value: 'health',
    },
    {
      name: 'หมวดทั่วไป',
      value: 'general',
    },
  ];

  return (
    <>
      <Title>โจ๊กปริศนา</Title>
      <div className="w-full flex flex-col gap-4">
        {subCategories.map(({ name, value }) => (
          <Link key={name} href={`/categories/${category}/sub/${value}`}>
            <Button className="w-full" variant="outline">
              {name}
            </Button>
          </Link>
        ))}
        <Link href="/">
          <Button className="w-full" variant="outline">
            ย้อนกลับ
          </Button>
        </Link>
      </div>
    </>
  );
};

export default Category;
