import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const mockAnswer = {
      first: 'หมู',
      second: 'หมา',
      third: 'กา',
      fourth: 'ไก่',
    }
    const { inputFirst, inputSecond, inputThird, inputFourth } = req.body as {
      inputFirst: string
      inputSecond: string
      inputThird: string
      inputFourth: string
    }
    if (
      inputFirst === undefined ||
      inputSecond === undefined ||
      inputThird === undefined ||
      inputFourth === undefined
    )
      res.status(404).json({ message: 'Not found your answer' })
    if (
      inputFirst != mockAnswer.first ||
      inputSecond != mockAnswer.second ||
      inputThird != mockAnswer.third ||
      inputFourth != mockAnswer.fourth
    ) {
      res.status(200).json({ message: false })
    }
    res.status(200).json({ message: true })
  } else {
    res.status(405).end()
  }
}
