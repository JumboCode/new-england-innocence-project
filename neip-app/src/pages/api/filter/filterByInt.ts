import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../utils/database/connectToDb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        value,
        field,
        constraint,
        model
    } = req.body

    if (
        !value || typeof value !== 'number' ||
        !field || typeof field !== 'string' ||
        !['<', '<=', '>', '>=', '='].includes(constraint)
    ) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const query = `
            SELECT id
            FROM "${model}"
            WHERE "${field}" ${constraint} ${value}
        `;

        const exonerees = await prisma.$queryRawUnsafe<{ id: number }[]>(query);

        const ids = exonerees.map((result)  => result.id);

        return res.status(200).json({exonerees: ids});

    } catch (error) {
        return res.status(400).json({ error: 'Failed to get IDs'});
        console.log(error);
    }
}
