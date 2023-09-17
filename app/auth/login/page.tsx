'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LoginSchema, loginSchema } from '../../../schemas/auth/login';

import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../../../components/ui/form';

const Login = () => {
  const router = useRouter();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginSchema) => {
    const response = await fetch('/api/v1/auth/login', {
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
    <>
      <div className="relative mb-6 rounded-md overflow-hidden aspect-video">
        <Image
          className="object-cover object-[left_0_top_80%]"
          src="/auth.jpg"
          alt="auth"
          fill
        />
      </div>
      <h1 className="text-2xl mt-6 mb-3 font-bold">เข้าสู่ระบบ</h1>
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
          <Link href="/auth/register">
            <Button className="w-full" variant="outline">
              สมาชิกใหม่
            </Button>
          </Link>
          <Button type="submit">ล็อกอิน</Button>
        </form>
      </Form>
    </>
  );
};

export default Login;
