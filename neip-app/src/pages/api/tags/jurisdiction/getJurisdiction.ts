import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../utils/database/connectToDb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const jurisdictions = await prisma.jurisdictionDropdownOption.findMany();
    const values = jurisdictions.map((jurisdiction) => jurisdiction.value);

    return res.status(200).json(values);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}