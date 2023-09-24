'use client';

import { ROLE } from '@/constants/role';
import { UserData } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withoutAuth = (WrappedComponent: React.ComponentType<any>) => {
  const WrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const WithoutAuth: React.FC = props => {
    const router = useRouter();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
      const user = localStorage.getItem('user');

      if (user) {
        const parsedUser: UserData = JSON.parse(user);

        if (parsedUser.userId && parsedUser.roleId) {
          if (parsedUser.roleId === ROLE.ADMIN) {
            router.replace('/admin');
            return;
          }
          router.replace('/');
          return;
        }
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

  WithoutAuth.displayName = `WithoutAuth(${WrappedComponentName})`;

  return WithoutAuth;
};

export default withoutAuth;
