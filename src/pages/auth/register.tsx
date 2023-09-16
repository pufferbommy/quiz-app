'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { registerSchema, RegisterSchema } from '@/zodSchema/auth/register';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

const Register = () => {
  const router = useRouter();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: RegisterSchema) => {
    const response = await fetch('/api/auth/register', {
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    const data = await response.json();

    if (response.ok && data.message === 'success') {
      router.push('/');
    }
  };

  return (
    <div className="px-3">
      <div className="max-w-md mx-auto mt-36">
        <div className="relative rounded-md overflow-hidden aspect-video">
          <Image
            className="object-cover object-[left_0_top_80%]"
            src="/auth.jpg"
            alt="auth"
            fill
          />
        </div>
        <h1 className="text-2xl mt-6 mb-3 font-bold">สมัครสมาชิกใหม่</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="อีเมล" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="รหัสผ่าน" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="ยืนยันรหัสผ่าน"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-2">
              <Link href="/auth/login">
                <Button className="w-full" variant="outline">
                  ย้อนกลับ
                </Button>
              </Link>
              <Button type="submit">ยืนยัน</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Register;
