import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/database/connectToDb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { ids } = req.body;
  
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: 'Valid IDs array is required' });
  }

  try {
    // Use Prisma transaction to ensure all deletions succeed or none do
    const result = await prisma.$transaction(
      ids.map(id => 
        prisma.exoneree.delete({
          where: { id: Number(id) },
        })
      )
    );
    
    return res.status(200).json({ 
      message: `Successfully deleted ${result.length} exonerees`, 
      deletedCount: result.length 
    });
  } catch (error) {
    console.error('Batch delete error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return res.status(500).json({ error: `Failed to delete exonerees: ${errorMessage}` });
  }
}