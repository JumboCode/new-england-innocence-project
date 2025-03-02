import { Prisma } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/database/connectToDb';

export default async function handler (req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { id } = req.query

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'Valid ID is required' });
  }

  try {
    const officer = await prisma.officer.findUnique({
      where: { id: Number(id) },
      select: { name: true },
    });

    if (!officer) {
      return res.status(400).json({ error: "Officer not found" });
    }

    res.status(200).json(officer.name);

  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve officer" })
  }
}