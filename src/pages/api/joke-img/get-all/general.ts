import { NextApiRequest, NextApiResponse } from 'next';
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'GET') {
    const mockData = [
      { no: 1, imgPaht: '' },
      { no: 2, imgPaht: '' },
      { no: 3, imgPaht: '' },
      { no: 4, imgPaht: '' },
      { no: 5, imgPaht: '' },
    ];
    res.status(200).json({ mockData });
  } else {
    res.status(405).end();
  }
}
