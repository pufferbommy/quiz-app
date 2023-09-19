'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { StatusMessageResponse } from '@/lib/types';
import { useToast } from '@/components/ui/use-toast';
import { LoginSchema, loginSchema } from '@/schemas/auth/login';

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginSchema) => {
    setIsSubmitting(true);
    const response = await fetch('/api/v1/auth/login', {
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    const data: StatusMessageResponse = await response.json();
    if (data.status === 'success') {
      setTimeout(() => {
        toast({
          title: data.status,
          description: data.message,
        });
      }, 600);
    }
    setTimeout(() => {
      if (data.status === 'error') {
        toast({
          title: data.status,
          description: data.message,
          variant: 'destructive',
        });
        form.reset();
        form.setValue('email', values.email);
        form.setValue('password', values.password);
      } else {
        router.push('/');
      }
      setIsSubmitting(false);
    }, 1000);
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
        <Button disabled={isSubmitting} type="submit">
          {!isSubmitting ? 'ล็อกอิน' : 'กำลังล็อกอิน...'}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
