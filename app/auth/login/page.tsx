import Link from 'next/link';

import Title from '@/components/text/title';
import { Button } from '@/components/ui/button';
import LoginForm from '@/components/form/LoginForm';

const Login = () => {
  return (
    <>
      <Title>ล็อกอิน</Title>
      <LoginForm />
      <div className="flex justify-center gap-2 text-sm items-center mt-4">
        <p>ยังไม่ได้เป็นสมาชิก?</p>
        <Link href="/auth/register">
          <Button size="lg" variant="link">
            สมัคร
          </Button>
        </Link>
      </div>
    </>
  );
};

export default Login;
