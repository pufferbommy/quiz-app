import CenteredLayout from '@/layouts/CenteredLayout';

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return <CenteredLayout>{children}</CenteredLayout>;
};

export default AuthLayout;
