import Link from 'next/link';

import Title from '@/components/text/title';
import { Button } from '@/components/ui/button';
import { subCategories } from '@/constants/sub-categories';

const Category = ({ params }: { params: { category: string } }) => {
  const { category } = params;

  return (
    <>
      <Title>โจ๊กปริศนา</Title>
      <div className="w-full flex flex-col gap-4">
        {subCategories.map(({ nameThai, nameEng }) => (
          <Link key={nameEng} href={`/categories/${category}/sub/${nameEng}`}>
            <Button className="w-full" variant="outline">
              {nameThai}
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
