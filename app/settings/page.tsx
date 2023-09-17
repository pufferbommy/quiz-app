import Link from 'next/link';

import { Button } from '../../components/ui/button';

const Settings = () => {
  return (
    <>
      <h1 className="text-4xl mb-8 text-center">การตั้งค่า</h1>
      <div className="text-center">
        <Link href="/">
          <Button>ย้อนกลับ</Button>
        </Link>
      </div>
    </>
  );
};

export default Settings;
