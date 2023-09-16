'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { loginSchema } from '@/zodSchema/login';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { useState } from 'react';

const Login = () => {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const response = await fetch('/api/auth/login', {
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    const data = await response.json();

    if (data.error) {
      setError(data.error.message);
      return;
    }

    if (response.ok && data.message === 'success') {
      router.push('/');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="relative my-4 rounded-md overflow-hidden w-full aspect-square">
        <Image src="/auth.jpg" alt="auth" fill />
      </div>
      {error && (
        <Alert className="mb-4" variant="destructive">
          <AlertTitle className="mb-0">{error}</AlertTitle>
        </Alert>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
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
                  <Input placeholder="รหัสผ่าน" {...field} />
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
    </div>
  );
};

export default Login;
