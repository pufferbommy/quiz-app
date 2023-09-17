import Link from 'next/link';

import { Button } from '../../../components/ui/button';

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
      <h1 className="text-4xl mb-8 text-center">โจ๊กปริศนา</h1>
      <div className="w-full flex flex-col gap-4">
        {subCategories.map(({ name, value }) => (
          <>
            {value === 'health' ? (
              <Button key={name} disabled className="w-full" variant="outline">
                {name}
              </Button>
            ) : (
              <Link key={name} href={`/categories/${category}/sub/${value}`}>
                <Button className="w-full" variant="outline">
                  {name}
                </Button>
              </Link>
            )}
          </>
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
