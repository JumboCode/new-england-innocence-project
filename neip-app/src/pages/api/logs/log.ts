import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/database/connectToDb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   
    if (req.method === 'POST') {
        const { name, role, action, object, date } = req.body

        // Basic validation
        if (!name || !role || !action || !object || !date) {
            return res.status(400).json({ error: 'Missing required fields.' })
        }

        try {
        const log = await prisma.log.create({
            data: { name, role, action, object, date },
        })

        return res.status(200).json({ message: 'Log created successfully.', log })
        } catch (error) {
            return res.status(400).json({ error: `Failed to create log: ${error}` })
        }

    } else if (req.method === 'GET') {
        try {
            const logs = await prisma.log.findMany({
                orderBy: { id: 'desc' }, // Most recent first
            })
            return res.status(200).json(logs)
        } catch (error) {
            return res.status(400).json({ error: `Failed to fetch logs: ${error}` })
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST'])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
