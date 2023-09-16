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
    if (inputFirst && inputSecond && inputThird && inputFourth) {
      const isInputCorrect =
        inputFirst === mockAnswer.first &&
        inputSecond === mockAnswer.second &&
        inputThird === mockAnswer.third &&
        inputFourth === mockAnswer.fourth;
      isInputCorrect
        ? res.status(200).json({ message: true, answer: mockAnswer })
        : res.status(200).json({ message: false });
    } else {
      res.status(404).json({ message: 'Not found your answer' });
    }
  } else {
    res.status(405).end();
  }
}
