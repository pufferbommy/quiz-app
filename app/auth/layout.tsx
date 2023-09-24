'use client';

import Image from 'next/image';

import CenteredLayout from '@/layouts/CenteredLayout';
import withoutAuth from '@/components/wrapper/withoutAuth';

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <CenteredLayout>
      <div className="relative w-[50%] translate-x-4 mb-8 mx-auto aspect-square">
        <Image src="/logo.png" alt="" fill />
      </div>
      {children}
    </CenteredLayout>
  );
};

export default withoutAuth(AuthLayout);
