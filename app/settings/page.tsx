import Link from 'next/link';

import { Button } from '@/components/ui/button';
import Title from '@/components/text/title';

const Settings = () => {
  return (
    <>
      <Title>การตั้งค่า</Title>
      <div className="text-center">
        <Link href="/">
          <Button>ย้อนกลับ</Button>
        </Link>
      </div>
    </>
  );
};

export default Settings;
