import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z.string().email('อีเมลไม่ถูกต้อง'),
    password: z.string().min(1, 'รหัสผ่านต้องมีอย่างน้อย 1 ตัวอักษร'),
    confirmPassword: z.string().min(1, 'รหัสผ่านต้องมีอย่างน้อย 1 ตัวอักษร'),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'รหัสผ่านไม่ตรงกัน',
    path: ['confirmPassword'],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
