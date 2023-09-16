import { NextApiRequest, NextApiResponse } from 'next'
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const mockData = 'หมูขี่ม้า'
  const { answer } = req.body as { answer: string; group: number; no: number }
  if (req.method === 'POST') {
    if (req.body === undefined || answer === '') {
      res.status(404).json({ message: 'Not found your answer' })
    }
    res.status(200).json({ message: answer === mockData })
  } else {
    res.status(405).end()
  }
}
