import Link from 'next/link';

import Title from '@/components/text/Title';
import { Button } from '@/components/ui/button';
import RegisterForm from '@/components/form/RegisterForm';

const Register = () => {
  return (
    <>
      <Title>สมัคร</Title>
      <RegisterForm />
      <div className="flex justify-center gap-2 text-sm items-center mt-4">
        <p>เป็นสมาชิกอยู่แล้ว?</p>
        <Link href="/auth/login">
          <Button size="lg" variant="link">
            เข้าสู่ระบบ
          </Button>
        </Link>
      </div>
    </>
  );
};

export default Register;
