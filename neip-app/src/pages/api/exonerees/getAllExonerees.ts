import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/database/connectToDb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        console.log('✅ Fetching exonerees from database...');
        
        const exonerees = await prisma.exoneree.findMany({
            include: {
                personalInfo: true, // Ensure this includes `dob`
                caseInfo: true,
                legalInfo: true,
                postExonerationInfo: true,
            }
        });

        console.log('✅ API Full Response:', JSON.stringify(exonerees, null, 2));

        return res.status(200).json({ 
            success: true,
            message: "Exonerees retrieved successfully",
            data: exonerees              
        });
    } catch (error) {
        console.error('🚨 Prisma error:', error);
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
}
