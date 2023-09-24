'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { StatusMessageDataResponse, UserData } from '@/lib/types';
import { LoginSchema, loginSchema } from '@/schemas/auth/login';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { ROLE } from '@/constants/role';

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
    const result: StatusMessageDataResponse<UserData> = await response.json();
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
      if (result.data.roleId === ROLE.USER) {
        router.push('/');
      } else {
        router.push('/admin');
      }
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
        <Button isSubmitting={isSubmitting} disabled={isSubmitting} type="submit">
          ล็อกอิน
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
