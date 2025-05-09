import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/database/connectToDb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'ID parameter is required and must be a string' });
  }

  try {
    const deletedOfficer = await prisma.officer.delete({
      where: {
        id: parseInt(id as string, 10),
      },
    });

    return res.status(200).json({ message: 'Officer deleted successfully', deletedOfficer });
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'Officer not found';
    console.log(errorMessage);
    return res.status(404).json({ error: `Failed to delete Officer: ${errorMessage}` });
  }
}