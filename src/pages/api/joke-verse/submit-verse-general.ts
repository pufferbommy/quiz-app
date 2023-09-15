import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const mockData = {
      first: 'หมู',
      second: 'หมา',
      third: 'กา',
      fourth: 'ไก่',
    }
    const userData = {
      first: req.body.first,
      second: req.body.second,
      third: req.body.third,
      fourth: req.body.fourth,
    }
    if (
      userData.first === undefined ||
      userData.second === undefined ||
      userData.third === undefined ||
      userData.fourth === undefined
    )
      res.status(404).json({ message: 'Not found your answer' })
    if (
      userData.first != mockData.first ||
      userData.second != mockData.second ||
      userData.third != mockData.third ||
      userData.fourth != mockData.fourth
    ) {
      res.status(200).json({ message: false })
    }
    res.status(200).json({ message: true })
  } else {
    res.status(405).end()
  }
}
