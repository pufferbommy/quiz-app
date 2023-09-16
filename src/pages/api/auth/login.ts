import { NextApiRequest, NextApiResponse } from 'next';

import { loginSchema } from '@/zodSchema/login';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method !== 'POST') {
    return res.status(405).json({
      error: { message: `Method ${method} Not Allowed` },
    });
  }

  const response = loginSchema.safeParse(req.body);

  if (!response.success) {
    return res.status(400).json({
      error: { message: response.error },
    });
  }

  const { email, password } = response.data;

  const user = {
    email: 'testquiz@mail.com',
    password: '987654321',
  };

  const isUserValid = email === user.email && password === user.password;

  if (!isUserValid) {
    return res.status(401).json({
      error: { message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' },
    });
  } else {
    return res.status(200).json({
      message: 'success',
    });
  }
}
