import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z.string().nonempty('กรุณากรอกอีเมล').email('อีเมลไม่ถูกต้อง'),
    username: z.string().nonempty('กรุณากรอกชื่อผู้ใช้'),
    password: z.string().nonempty('กรุณากรอกรหัสผ่าน'),
    confirmPassword: z.string().nonempty('กรุณากรอกยืนยันรหัสผ่าน'),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'รหัสผ่านไม่ตรงกัน',
    path: ['confirmPassword'],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
