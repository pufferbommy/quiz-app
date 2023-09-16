import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const user = {
      username: 'testquiz@mail.com',
      password: '987654321',
    }
    const { username, password } = req.body as {
      username: string
      password: string
    }
    if (req.body === undefined || username === '') {
      res.status(404).json({ message: 'Not found' })
    }
    if (req.body === undefined || password === '') {
      res.status(404).json({ message: 'Not found' })
    }
    res.status(200).json({
      message: username === user.username && password === user.password,
    })
  } else {
    res.status(405).end()
  }
}
