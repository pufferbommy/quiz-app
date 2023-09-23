'use client';

import withAuth from '@/components/wrapper/withAuth';
import CenteredLayout from '@/layouts/CenteredLayout';

interface Props {
  children: React.ReactNode;
}

const UserLayout = ({ children }: Props) => {
  return <CenteredLayout>{children}</CenteredLayout>;
};

export default withAuth(UserLayout);
