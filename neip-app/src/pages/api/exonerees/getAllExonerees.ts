// import { NextApiRequest, NextApiResponse } from 'next';
// import { prisma } from '../../../utils/database/connectToDb'

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method !== 'GET') {
//         return res.status(405).json({ message: 'Method Not Allowed' });
//     }

//     try {
//         console.log('✅ Prisma is being called!');
        
//         const exonerees = await prisma.exoneree.findMany();
//         console.log('✅ Fetched exonerees:', exonerees);
        
//         return res.status(200).json({ 
//             success: true,
//             message: "Exonerees retrieved successfully",
//             data: exonerees              
//         });
//     } catch (error) {
//         console.error('🚨 Prisma error:', error);
//         return res.status(500).json({ message: 'Internal Server Error', error });
//     }
// }

import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/database/connectToDb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        console.log('✅ Prisma is being called!');
        
        // Fetch exonerees and include related objects
        const exonerees = await prisma.exoneree.findMany({
            include: {
                personalInfo: true, // Fetch full personalInfo object
                caseInfo: true,     // Fetch full caseInfo object
                legalInfo: true,    // Fetch full legalInfo object
                postExonerationInfo: true, // Fetch full postExonerationInfo object
            }
        });

        console.log('✅ Fetched exonerees with full data:', exonerees);
        
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
