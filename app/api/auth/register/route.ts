import { NextRequest, NextResponse } from 'next/server';
import { registerSchema } from '../../../../zodSchema/auth/register';

export async function POST(request: NextRequest) {
  const json = await request.json();

  const response = registerSchema.safeParse(json);

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

  return NextResponse.json(
    {
      message: 'success',
    },
    {
      status: 200,
    }
  );
}
