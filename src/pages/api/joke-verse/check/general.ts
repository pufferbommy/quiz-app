import { NextApiRequest, NextApiResponse } from 'next';

import { verseSchema } from '../../../../../zodSchema/general';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method != 'POST') {
    return res.status(405).json({
      error: { message: `Method ${method} Not Allowed` },
    });
  }

  const response = verseSchema.safeParse(req.body);

  if (!response.success) {
    return res.status(400).json({
      error: { message: response.error },
    });
  }

  const { inputFirst, inputSecond, inputThird, inputFourth } = response.data;

  const mockAnswer = {
    first: 'หมู',
    second: 'หมา',
    third: 'กา',
    fourth: 'ไก่',
  };

  const isCorrect = () => {
    const isEmptyAnswer =
      inputFirst == '' ||
      inputSecond === '' ||
      inputThird === '' ||
      inputFourth === '';

    const isCorrectAnswer =
      inputFirst === mockAnswer.first &&
      inputSecond === mockAnswer.second &&
      inputThird === mockAnswer.third &&
      inputFourth === mockAnswer.fourth;

    if (isEmptyAnswer) {
      return res.status(404).json({ message: 'Not found your answer' });
    }

    if (isCorrectAnswer) {
      return res.status(200).json({
        message: true,
        description: 'คำอธิบายโจ๊ก',
      });
    } else {
      return res.status(200).json({ message: false });
    }
  };

  isCorrect();
}
