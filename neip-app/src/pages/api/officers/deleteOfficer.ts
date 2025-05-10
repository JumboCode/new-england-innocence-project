import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/database/connectToDb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'ID parameter is required and must be a string' });
  }

  try {
    const officerId = parseInt(id, 10);

    // Find the officer being deleted
    const officerToDelete = await prisma.officer.findUnique({
      where: { id: officerId },
    });

    if (!officerToDelete) {
      return res.status(404).json({ error: 'Officer not found' });
    }

    // Find all LegalInfo records that contain the officer in officersInvolved
    const affectedLegalInfos = await prisma.legalInfo.findMany({
      where: {
        officersInvolved: {
          has: officerToDelete.name,
        },
      },
    });

    // Step 3: Update each LegalInfo to remove the officer's name from the array
    await Promise.all(
      affectedLegalInfos.map((legalInfo) =>
        prisma.legalInfo.update({
          where: { id: legalInfo.id },
          data: {
            officersInvolved: legalInfo.officersInvolved.filter(
              (name) => name !== officerToDelete.name
            ),
          },
        })
      )
    );

    // Delete officer 
    const deletedOfficer = await prisma.officer.delete({
      where: {
        id: parseInt(id as string, 10),
      },
    });

    return res.status(200).json({ message: 'Officer removed from all records and deleted successfully', deletedOfficer });
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'Officer not found';
    console.log(errorMessage);
    return res.status(404).json({ error: `Failed to delete Officer: ${errorMessage}` });
  }
}