'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const WrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const WithAuth: React.FC = props => {
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

  WithAuth.displayName = `WithAuth(${WrappedComponentName})`;

  return WithAuth;
};

export default withAuth;
