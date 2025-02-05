import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Here in deleteExoneree")
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'ID parameter is required and must be a string' });
  }

  try {
    const deletedExoneree = await prisma.exoneree.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json({ message: 'Exoneree deleted successfully', deletedExoneree });
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'Exoneree not found';
    console.log(errorMessage);
    return res.status(404).json({ error: `Failed to delete Exoneree: ${errorMessage}` });
  }
}