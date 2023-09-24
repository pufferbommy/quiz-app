'use client';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { StatusMessageDataResponse } from '@/lib/types';
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
    const user: { id: string; roleId: number } = JSON.parse(localStorage.getItem('user')!);
    const url = `/api/v1/users/${user.id}`;
    const response = await fetch(url, {
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
    if (data.status === 'error') {
      form.reset();
      form.setValue('username', values.username);
    } else {
      await fetchCurrentUser();
    }
    setIsSubmitting(false);
  };

  const fetchCurrentUser = async () => {
    const user: { id: string; roleId: number } = JSON.parse(localStorage.getItem('user')!);
    const url = `/api/v1/users/${user.id}`;
    const response = await fetch(url);
    const result: StatusMessageDataResponse<{ username: string }> = await response.json();
    if (result.status === 'error') {
      toast({
        title: result.status,
        description: result.message,
      });
      return;
    }
    form.setValue('username', result.data.username);
  };

  useEffect(() => {
    (async () => {
      await fetchCurrentUser();
    })();
  }, []);

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
