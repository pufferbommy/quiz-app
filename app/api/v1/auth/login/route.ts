import { NextRequest, NextResponse } from 'next/server';

import { loginSchema } from '../../../../../schemas/auth/login';

export async function POST(request: NextRequest) {
  const json = await request.json();

  const response = loginSchema.safeParse(json);

  if (!response.success) {
    return NextResponse.json(
      {
        error: { message: response.error },
      },
      {
        status: 400,
      }
    );
  }

  const { email, password } = response.data;

  const user = {
    email: 'testquiz@mail.com',
    password: '987654321',
  };

  const isUserValid = email === user.email && password === user.password;

  if (!isUserValid) {
    return NextResponse.json(
      {
        error: { message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' },
      },
      {
        status: 401,
      }
    );
  } else {
    return NextResponse.json(
      {
        message: 'success',
      },
      {
        status: 200,
      }
    );
  }
}
