import Link from 'next/link';
import Logo from '../Logo';
import { Button } from '../ui/button';

interface Props {
  resumeGame: () => void;
}

const PauseMenu = ({ resumeGame }: Props) => {
  return (
    <>
      <Logo />
      <div className="flex flex-col gap-3">
        <Button onClick={resumeGame}>เล่นต่อ</Button>
        <Link href="/">
          <Button variant="outline" className="w-full">
            ออกจากเกม
          </Button>
        </Link>
      </div>
    </>
  );
};

export default PauseMenu;
