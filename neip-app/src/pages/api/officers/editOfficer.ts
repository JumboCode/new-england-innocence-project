import { prisma } from '../../../utils/database/connectToDb'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id, name, notes, MediaLinks, department, actorName, actorRole } = req.body;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'Valid ID is required' });
  }

  try {
    const existingOfficer = await prisma.officer.findUnique({
      where: { id: Number(id) },
    });

    if (!existingOfficer) {
      return res.status(400).json({ error: 'Officer not found' })
    }

    const updatedOfficer = await prisma.officer.update({
      where: { id: Number(id) },
      data: { name, notes, MediaLinks, department },
    })

    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
    const host = req.headers.host || 'localhost:3000'
    const baseUrl = `${protocol}://${host}`

    // Log EDIT officer
    await fetch(`${baseUrl}/api/logs/log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: actorName, 
        role: actorRole,
        action: 'update',
        object: `officer ${name}`,
        date: new Date().toISOString()
      })
    })

    return res.status(200).json(updatedOfficer);

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Failed to update officer' });
  }
    
}
