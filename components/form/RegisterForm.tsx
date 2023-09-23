'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { StatusMessageDataResponse } from '@/lib/types';
import { useToast } from '@/components/ui/use-toast';
import { RegisterSchema, registerSchema } from '@/schemas/auth/register';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

const RegisterForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: RegisterSchema) => {
    setIsSubmitting(true);
    const response = await fetch('/api/v1/auth/register', {
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    const result: StatusMessageDataResponse<{ userId: number; roleId: number }> =
      await response.json();
    toast({
      title: result.status,
      description: result.message,
      variant: result.status === 'success' ? 'default' : 'destructive',
    });
    if (result.status === 'success') {
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: result.data.userId,
          roleId: result.data.roleId,
        })
      );
      router.push('/');
    } else {
      form.reset();
      form.setValue('email', values.email);
      form.setValue('password', values.password);
    }
    setIsSubmitting(false);
  };

  return (
    <Form {...form}>
      <form
        autoComplete="off"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          disabled={isSubmitting}
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
          disabled={isSubmitting}
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="ชื่อผู้ใช้" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isSubmitting}
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
          disabled={isSubmitting}
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="ยืนยันรหัสผ่าน" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isSubmitting} type="submit">
          {!isSubmitting ? 'สมัคร' : 'กำลังสมัคร...'}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;