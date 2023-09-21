import Link from 'next/link';

import Title from '@/components/text/title';
import { Button } from '@/components/ui/button';
import SettingsForm from '@/components/form/SettingsForm';

const Settings = () => {
  return (
    <>
      <Title>การตั้งค่า</Title>
      <SettingsForm />
      <Link href="/">
        <Button variant="outline" className="w-full mt-4">
          ย้อนกลับ
        </Button>
      </Link>
    </>
  );
};

export default Settings;
