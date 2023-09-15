import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Register = () => {
  return (
    <div className="max-w-md mx-auto mt-2 flex flex-col gap-2">
      <Input placeholder="รหัสผู้ใช้" />
      <Input placeholder="รหัสผ่าน" />
      <Input placeholder="ยืนยันรหัสผ่าน" />
      <div className="grid grid-cols-2 gap-2">
        <Link href="/auth/login">
          <Button className="w-full" variant="outline">
            ย้อนกลับ
          </Button>
        </Link>
        <Button>ยืนยัน</Button>
      </div>
    </div>
  )
}

export default Register
