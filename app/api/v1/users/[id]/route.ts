import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { userSchema } from '@/schemas/settings/user';
import { StatusMessageDataResponse, StatusMessageResponse } from '@/lib/types';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const userId = request.url.split('users/')[1];
  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
    select: {
      username: true,
    },
  });

  if (!user) {
    return NextResponse.json<StatusMessageResponse>(
      {
        status: 'error',
        message: 'User not found',
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json<StatusMessageDataResponse<{ username: string }>>(
    {
      status: 'success',
      message: 'Get user successfully',
      data: {
        username: user.username,
      },
    },
    {
      status: 200,
    }
  );
}

export async function POST(request: NextRequest) {
  const json = await request.json();

  const parsed = userSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: { message: parsed.error },
      },
      {
        status: 400,
      }
    );
  }

  const { username } = parsed.data;
  const userId = request.url.split('users/')[1];
  await prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      username,
    },
  });

  return NextResponse.json<StatusMessageResponse>(
    {
      status: 'success',
      message: 'อัพเดตชื่อผู้ใช้สำเร็จ',
    },
    {
      status: 200,
    }
  );
}
