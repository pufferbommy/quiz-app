import { NextRequest, NextResponse } from 'next/server';

import { loginSchema } from '@/schemas/auth/login';
import { StatusMessageDataResponse, StatusMessageResponse } from '@/lib/types';

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

  // roleId: 1 = admin, 2 = user
  const users = [
    {
      id: 1,
      email: 'testquiz@mail.com',
      password: '987654321',
      roleId: 1,
    },
    {
      id: 2,
      email: 'admin@gmail.com',
      password: '123',
      roleId: 2,
    },
  ];

  const user = users.find(user => user.email === email);

  if (!user) {
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

  // compare password
  const isMatch = password === user.password;

  if (isMatch) {
    const userId = user.id;
    const roleId = user.roleId;
    return NextResponse.json<StatusMessageDataResponse<{ userId: number; roleId: number }>>(
      {
        status: 'success',
        message: 'เข้าสู่ระบบสำเร็จ',
        data: {
          userId,
          roleId,
        },
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
