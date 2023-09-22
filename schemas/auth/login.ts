import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().nonempty('กรุณากรอกอีเมล').email('อีเมลไม่ถูกต้อง'),
  password: z.string().nonempty('กรุณากรอกรหัสผ่าน'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
