import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const mockAnswer = {
      first: 'หมู',
      second: 'หมา',
      third: 'กา',
      fourth: 'ไก่',
    };
    const { inputFirst, inputSecond, inputThird, inputFourth } = req.body as {
      inputFirst: string;
      inputSecond: string;
      inputThird: string;
      inputFourth: string;
    };
    const isInputInCorrect =
      inputFirst != mockAnswer.first ||
      inputSecond != mockAnswer.second ||
      inputThird != mockAnswer.third ||
      inputFourth != mockAnswer.fourth;
    if (req.body === undefined)
      res.status(404).json({ message: 'Not found your answer' });
    if (isInputInCorrect) {
      res.status(200).json({ message: false });
    }
    res.status(200).json({ message: true });
  } else {
    res.status(405).end();
  }
}
