import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { keyword } = req.query;

    if (!keyword || typeof keyword !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing keyword parameter' });
    }

    try {
        const results = await prisma.exoneree.findMany({
            where: {
                OR: [
                    { personalInfo: { name: { contains: keyword, mode: 'insensitive' } } },
                    { personalInfo: { email: { contains: keyword, mode: 'insensitive' } } },

                    //{ state: { contains: keyword, mode: 'insensitive' } },
                    //{ country: { contains: keyword, mode: 'insensitive' } },
                    //{ location: { contains: keyword, mode: 'insensitive' } },
                ],
            },
            // include: {
            //     personalInfo: true,
            //     caseInfo: true,
            //     legalInfo: true,
            //     wrongfulConvictionInfo: true,
            //     postExonerationInfo: true,
            //     metaData: true,
            // }
        });

        return res.status(200).json(results.length > 0 ? results : []);
    } catch (error) {
        console.error('Search error:', error);
        return res.status(400).json({ error: 'Failed to fetch exonerees' });
    }
}