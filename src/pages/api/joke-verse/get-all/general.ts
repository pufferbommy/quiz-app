import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'GET') {
    const mockData = [
      { no: 1, imgPaht: '/images/verse/general/01.JPG' },
      { no: 2, imgPaht: '/images/verse/general/02.JPG' },
      { no: 3, imgPaht: '/images/verse/general/03.JPG' },
      { no: 4, imgPaht: '/images/verse/general/04.JPG' },
      { no: 5, imgPaht: '/images/verse/general/05.JPG' },
    ];
    res.status(200).json({ mockData });
  } else {
    res.status(405).end();
  }
}
