import { useRouter } from 'next/router';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const Category = () => {
  const router = useRouter();

  const { category } = router.query;

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
      <h1 className="text-4xl mb-6 text-center">โจ๊กปริศนา</h1>
      <div className="w-full flex flex-col gap-3">
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
