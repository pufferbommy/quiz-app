import { NextRequest, NextResponse } from 'next/server';

import { StatusMessageDataResponse, StatusMessageResponse } from '@/lib/types';
import { registerSchema } from '@/schemas/auth/register';
import { ROLE } from '@/constants/role';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const request = await req.json();

  const parsedRequest = registerSchema.safeParse(request);

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

  const { email, username, password } = parsedRequest.data;

  // check email is already exists
  const isDuplicate = await prisma.users.findUnique({ where: { email: email } });
  if (isDuplicate)
    return NextResponse.json({ message: 'อีเมลนี้มีผู้ใช้งานแล้ว' }, { status: 400 });

  // hash password
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const user = {
    email,
    username,
    password: hash,
    role_id: ROLE.USER,
  };

  // save user to database

  try {
    const newUser = await prisma.users.create({ data: user });
    const userId = newUser.id;
    const roleId = newUser.role_id;
    return NextResponse.json<StatusMessageDataResponse<{ userId: string; roleId: number }>>(
      {
        status: 'success',
        message: 'สมัครสมาชิกสำเร็จ',
        data: {
          userId,
          roleId,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json<StatusMessageResponse>(
      {
        status: 'error',
        message: 'เกิดข้อผิดพลาดในการสมัครสมาชิก',
      },
      {
        status: 403,
      }
    );
  }
}
