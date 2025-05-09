import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/database/connectToDb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, actorName, actorRole } = req.body;

  const idToDelete = typeof id === 'string' ? parseInt(id, 10) : id;
  if (!idToDelete || isNaN(idToDelete)) {
    return res.status(400).json({ error: 'ID must be a valid number or string' });
  }

  try {
    const officer = await prisma.officer.findUnique({
      where: { id: idToDelete },
    });

    const deletedOfficer = await prisma.officer.delete({
      where: {
        id: idToDelete,
      },
    });

    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
    const host = req.headers.host || 'localhost:3000'
    const baseUrl = `${protocol}://${host}`

    // Log DELETE officer
    await fetch(`${baseUrl}/api/logs/log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: actorName, 
        role: actorRole,
        action: 'delete',
        object: `officer ${officer.name}`,
        date: new Date().toISOString()
      })
    })

    return res.status(200).json({ message: 'Officer deleted successfully', deletedOfficer });
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'Officer not found';
    console.log(errorMessage);
    return res.status(404).json({ error: `Failed to delete Officer: ${errorMessage}` });
  }
}