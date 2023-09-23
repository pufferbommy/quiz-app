import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function GET() {
  const users = await prisma.users.findMany();

  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const json = await request.json();

  const newUser = await prisma.users.create({ data: json });

  return NextResponse.json(newUser);
}
