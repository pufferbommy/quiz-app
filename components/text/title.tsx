import { cn } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Title = ({ children, className }: Props) => {
  return <h1 className={cn('text-4xl mb-4 text-center', className)}>{children}</h1>;
};

export default Title;
