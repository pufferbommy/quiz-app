'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { StatusMessageResponse } from '@/lib/types';
import { UserSchema, userSchema } from '@/schemas/settings/user';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';

const SettingsForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: '',
    },
  });

  const onSubmit = async (values: UserSchema) => {
    setIsSubmitting(true);
    const response = await fetch('/api/v1/auth/login', {
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    const data: StatusMessageResponse = await response.json();
    toast({
      title: data.status,
      description: data.message,
      variant: data.status === 'success' ? 'default' : 'destructive',
    });
    if (data.status === 'success') {
      // router.push('/');
    } else {
      form.reset();
      form.setValue('username', values.username);
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
        <Button isSubmitting={isSubmitting} variant="outline" disabled={isSubmitting} type="submit">
          เปลี่ยนชื่อผู้ใช้
        </Button>
      </form>
    </Form>
  );
};

export default SettingsForm;
