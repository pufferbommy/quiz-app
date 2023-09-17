import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('อีเมลไม่ถูกต้อง'),
  password: z.string().min(1, 'รหัสผ่านต้องมีอย่างน้อย 1 ตัวอักษร'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
