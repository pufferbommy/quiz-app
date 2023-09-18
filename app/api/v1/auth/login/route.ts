import { NextRequest, NextResponse } from 'next/server';

import { loginSchema } from '../../../../../schemas/auth/login';
import { StatusMessageResponse } from '../../../../../lib/types';

export async function POST(req: NextRequest) {
  const request = await req.json();

  const parsedRequest = loginSchema.safeParse(request);

  if (!parsedRequest.success) {
    return NextResponse.json<StatusMessageResponse>(
      {
        status: 'error',
        message: parsedRequest.error.message,
      },
      {
        status: 400,
      }
    );
  }

  const { email, password } = parsedRequest.data;

  const user = {
    email: 'testquiz@mail.com',
    password: '987654321',
  };

  const isMatch = email === user.email && password === user.password;

  if (isMatch) {
    return NextResponse.json<StatusMessageResponse>(
      {
        status: 'success',
        message: 'เข้าสู่ระบบสำเร็จ',
      },
      {
        status: 200,
      }
    );
  } else {
    return NextResponse.json<StatusMessageResponse>(
      {
        status: 'error',
        message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
      },
      {
        status: 401,
      }
    );
  }
}
