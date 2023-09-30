'use client';

import Logo from '@/components/Logo';
import CenteredLayout from '@/layouts/CenteredLayout';
import withoutAuth from '@/components/wrapper/withoutAuth';

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <CenteredLayout>
      <Logo />
      {children}
    </CenteredLayout>
  );
};

export default withoutAuth(AuthLayout);
