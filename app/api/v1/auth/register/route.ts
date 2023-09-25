import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { ROLE } from '@/constants/role';
import { registerSchema } from '@/schemas/auth/register';
import { StatusMessageDataResponse, StatusMessageResponse, UserData } from '@/lib/types';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const json = await req.json();

  const parsed = registerSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json<StatusMessageResponse>(
      {
        status: 'error',
        message: parsed.error.message,
      },
      {
        status: 400,
      }
    );
  }

  const { email, username, password } = parsed.data;

  const isEmailExist = await prisma.users.findUnique({ where: { email: email } });

  if (isEmailExist) {
    return NextResponse.json<StatusMessageResponse>(
      { status: 'error', message: 'อีเมลนี้มีผู้ใช้งานแล้ว' },
      { status: 400 }
    );
  }

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = {
    email,
    username,
    password: hashedPassword,
    role_id: ROLE.USER,
  };

  try {
    const newUser = await prisma.users.create({ data: user });
    await prisma.visitor_counters.update({ where: { id: 1 }, data: { count: { increment: 1 } } });
    return NextResponse.json<StatusMessageDataResponse<UserData>>(
      {
        status: 'success',
        message: 'สมัครสมาชิกสำเร็จ',
        data: {
          userId: newUser.id,
          roleId: newUser.role_id,
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
