'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Title from '@/components/text/title';
import { Button } from '@/components/ui/button';
import SettingsForm from '@/components/form/SettingsForm';
import { useToast } from '@/components/ui/use-toast';

const Settings = () => {
  const router = useRouter();
  const { toast } = useToast();

  const logout = () => {
    localStorage.removeItem('user');
    toast({
      title: 'success',
      description: 'ออกจากระบบสำเร็จ',
    });
    router.push('/auth/login');
  };

  return (
    <>
      <Title>การตั้งค่า</Title>
      <SettingsForm />
      <Button onClick={logout} variant="outline" className="w-full my-4">
        ออกจากระบบ
      </Button>
      <Link href="/">
        <Button variant="outline" className="w-full">
          ย้อนกลับ
        </Button>
      </Link>
    </>
  );
};

export default Settings;
