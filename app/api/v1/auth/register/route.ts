import { NextRequest, NextResponse } from 'next/server';

import { StatusMessageDataResponse, StatusMessageResponse } from '@/lib/types';
import { registerSchema } from '@/schemas/auth/register';
import { ROLE } from '@/constants/role';

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

  // hash password
  const hashedPassword = password;

  const user = {
    email,
    username,
    password: hashedPassword,
  };

  // save user to database
  try {
    const userId = 3;
    const roleId = ROLE.USER;
    return NextResponse.json<StatusMessageDataResponse<{ userId: number; roleId: number }>>(
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
