//getAllExonerees.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/database/connectToDb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const exonerees = await prisma.exoneree.findMany();

        return res.status(200).json({ exonerees });
    } catch (error) {
        console.error('Error fetching exonerees:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
