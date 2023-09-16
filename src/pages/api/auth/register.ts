import { NextApiRequest, NextApiResponse } from 'next';

import { registerSchema } from '@/zodSchema/auth/register';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method !== 'POST') {
    return res.status(405).json({
      error: { message: `Method ${method} Not Allowed` },
    });
  }

  const response = registerSchema.safeParse(req.body);

  if (!response.success) {
    return res.status(400).json({
      error: { message: response.error },
    });
  }

  const { email, password } = response.data;

  return res.status(200).json({
    message: 'success',
  });
}
