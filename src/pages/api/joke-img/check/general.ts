import { NextApiRequest, NextApiResponse } from 'next';

import { imgSchema } from '@/zodSchema/general';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method != 'POST') {
    return res.status(405).json({
      error: { message: `Method ${method} Not Allowed` },
    });
  }

  const response = imgSchema.safeParse(req.body);

  if (!response.success) {
    return res.status(400).json({
      error: { message: response.error },
    });
  }

  const { answer } = response.data;

  const mockAnswer = 'ม้าขี่หมู';

  const isCorrect = answer != '' && answer === mockAnswer;

  if (!isCorrect) {
    res.status(404).json({ message: false });
  } else {
    res.status(200).json({ message: true });
  }
}
