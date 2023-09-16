import { NextApiRequest, NextApiResponse } from 'next';
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const mockAnswer = 'ม้าขี่หมู';
  const { answer } = req.body as { group: number; no: number; answer: string };
  if (req.method === 'POST') {
    if (req.body === undefined || answer === '') {
      res.status(404).json({ message: 'Not found your answer' });
    }
    res.status(200).json({ message: answer === mockAnswer });
  } else {
    res.status(405).end();
  }
}
