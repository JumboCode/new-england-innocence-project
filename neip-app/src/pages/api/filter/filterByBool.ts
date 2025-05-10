import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { field, constraint, table } = req.body;

  // Normalize table name to lowercase to match model names
  const normalizedTable = table?.toLowerCase();

  const validConstraints = ['True', 'False', 'not True', 'not False'];

  if (!field || !validConstraints.includes(constraint) || !normalizedTable) {
    return res.status(400).json({ error: 'Invalid or missing parameters' });
  }

  try {
    const isNegated = constraint.startsWith('not');
    const boolValue = constraint.includes('True');
    let exonereeIds: number[] = [];

    // Define where clause dynamically
    const whereClause = isNegated
      ? { NOT: { [field]: boolValue } }
      : { [field]: boolValue };

    let relatedClause;

    if (normalizedTable === 'wrongfulconvictioninfo') {
      relatedClause = { wrongfulConvictionInfo: whereClause };
    } else if (normalizedTable === 'postexonerationinfo') {
      relatedClause = { postExonerationInfo: whereClause };
    } else {
      return res.status(400).json({ error: `Table '${table}' not supported for boolean filtering` });
    }

    const exonerees = await prisma.exoneree.findMany({
      where: relatedClause,
      select: { id: true }
    });

    exonereeIds = exonerees.map(e => e.id);

    return res.status(200).json(exonereeIds);
  } catch (error) {
    console.error('Filter by boolean error:', error);
    return res.status(500).json({ error: 'Failed to fetch exonerees' });
  }
}
