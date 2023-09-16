import { Button } from '../../components/ui/button';
import Link from 'next/link';

const HowToPlay = () => {
  return (
    <>
      <h1 className="text-4xl mb-6 text-center">วิธีการเล่น</h1>
      <div className="w-full aspect-[1/1] rounded-md bg-slate-300"></div>
      <div className="grid grid-cols-2 gap-3 mt-6">
        <Link href="/">
          <Button className="w-full" variant="outline">
            ย้อนกลับ
          </Button>
        </Link>
        <Button variant="outline">ถัดไป</Button>
      </div>
    </>
  );
};

export default HowToPlay;
