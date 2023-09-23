'use client';

import { ROLE } from '@/constants/role';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withAdminAuth = (WrappedComponent: React.ComponentType<any>) => {
  const WrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const WithAdminAuth: React.FC = props => {
    const router = useRouter();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
      const user = localStorage.getItem('user');

      if (!user) {
        router.push('/auth/login');
        return;
      }

      const parsedUser: { id: number; roleId: number } = JSON.parse(user);

      if (!parsedUser.id || !parsedUser.roleId) {
        router.push('/auth/login');
        return;
      }

      if (parsedUser.roleId === ROLE.USER) {
        router.push('/');
        return;
      }

      setIsCheckingAuth(false);
    }, [router]);

    return (
      <>
        {isCheckingAuth ? (
          <div className="flex justify-center items-center h-full">กำลังตรวจสอบสิทธิ์...</div>
        ) : (
          <WrappedComponent {...props} />
        )}
      </>
    );
  };

  WithAdminAuth.displayName = `WithAdminAuth(${WrappedComponentName})`;

  return WithAdminAuth;
};

export default withAdminAuth;
