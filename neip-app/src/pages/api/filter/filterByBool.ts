import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { field, constraint, table } = req.body;

    if (!field || (constraint !== "True" && constraint !== "False") || !table) {
        return res.status(400).json({ error: 'Invalid or missing parameters' });
    }

    try {
        const boolValue = constraint === "True";
        let exonereeIds: number[] = [];

        if (table === "wrongfulConvictionInfo") {
            const exonerees = await prisma.exoneree.findMany({
                where: {
                    wrongfulConvictionInfo: {
                        [field]: boolValue
                    }
                },
                select: { id: true }
            });
            exonereeIds = exonerees.map(e => e.id);
        } else if (table === "postExonerationInfo") {
            const exonerees = await prisma.exoneree.findMany({
                where: {
                    postExonerationInfo: {
                        [field]: boolValue
                    }
                },
                select: { id: true }
            });
            exonereeIds = exonerees.map(e => e.id);
        } else {
            return res.status(400).json({ error: `Table '${table}' not supported for boolean filtering` });
        }

        return res.status(200).json(exonereeIds);
    } catch (error) {
        console.error('Filter by boolean error:', error);
        return res.status(500).json({ error: 'Failed to fetch exonerees' });
    }
}
