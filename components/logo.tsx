import logo from '@/public/logo.png';
import Image from 'next/image';

const Logo = () => {
  return (
    <div className="relative w-[50%] translate-x-4 mb-8 mx-auto aspect-square">
      <Image quality={75} priority src={logo} alt="" />
    </div>
  );
};

export default Logo;
