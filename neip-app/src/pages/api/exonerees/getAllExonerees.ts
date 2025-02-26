import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        console.log('✅ Prisma is being called!');
        
        const exonerees = await prisma.exoneree.findMany();
        console.log('✅ Fetched exonerees:', exonerees);
        
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