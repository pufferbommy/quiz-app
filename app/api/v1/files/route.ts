import sharp from 'sharp';
import { NextRequest, NextResponse } from 'next/server';

import { StatusMessageDataResponse, UploadFileSuccessData } from '@/lib/types';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const arrayBuffer = await file.arrayBuffer();
  const splitFileName = file.name.split('.');
  splitFileName.pop();
  const originalFileName = splitFileName.join('');
  const destinationFileExtension = 'webp';
  const fileName = `${Date.now()}_${originalFileName}_${Math.random()
    .toString(36)
    .slice(2)}.${destinationFileExtension}`;
  const filePath = `public/${fileName}`;
  const filePathUrl = `/${fileName}`;
  await sharp(arrayBuffer)
    .rotate()
    .resize({
      width: 446,
      height: 250,
      fit: 'fill',
    })
    .webp({ quality: 75 })
    .toFile(filePath);
  return NextResponse.json<StatusMessageDataResponse<UploadFileSuccessData>>({
    status: 'success',
    message: 'File uploaded successfully',
    data: {
      filePath: filePathUrl,
    },
  });
}
