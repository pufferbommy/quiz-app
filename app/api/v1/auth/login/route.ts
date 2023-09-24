import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { loginSchema } from '@/schemas/auth/login';
import { StatusMessageDataResponse, StatusMessageResponse, UserData } from '@/lib/types';

const prisma = new PrismaClient();

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

  const user = await prisma.users.findUnique({ where: { email: email } });

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

  const isMatch = bcrypt.compareSync(password, user.password);

  if (isMatch) {
    const userId = user.id;
    const roleId = user.role_id;
    return NextResponse.json<StatusMessageDataResponse<UserData>>(
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
