import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Login = () => {
  return (
    <div className="max-w-md mx-auto mt-2 flex flex-col gap-2">
      <Input placeholder="รหัสผู้ใช้" />
      <Input placeholder="รหัสผ่าน" />
      <Link href="/auth/register">
        <Button className="w-full" variant="outline">
          สมาชิกใหม่
        </Button>
      </Link>
      <Button>ล็อกอิน</Button>
    </div>
  )
}

export default Login
