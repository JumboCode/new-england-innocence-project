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
                personalInfo: true, 
                caseInfo: true,
                legalInfo: true,
                wrongfulConvictionInfo: true,  
                postExonerationInfo: true,
                metaData: true, 
            }
        });
        

        // Helper function to format dates (handles Date objects and strings)
        const formatDate = (date: string | Date | null) => {
            if (!date) return "N/A";
            const parsedDate = typeof date === "string" ? new Date(date) : date;
            return isNaN(parsedDate.getTime()) ? "N/A" : parsedDate.toLocaleDateString("en-US");
        };

        // Helper function to format nullable fields
        const formatField = (field: any) => field && field !== "" ? field : "N/A";

        // Transform API response
        const formattedExonerees = exonerees.map(exoneree => ({
            ...exoneree,
            personalInfo: {
                ...exoneree.personalInfo,
                dateOfBirth: formatDate(exoneree.personalInfo?.dateOfBirth),
                phoneNumber: formatField(exoneree.personalInfo?.phoneNumber),
                address: formatField(exoneree.personalInfo?.address),
                email: formatField(exoneree.personalInfo?.email),
            },
            caseInfo: {
                ...exoneree.caseInfo,
                arrestDate: formatDate(exoneree.caseInfo?.arrestDate),
                convictionDate: formatDate(exoneree.caseInfo?.convictionDate),
                freedomDate: formatDate(exoneree.caseInfo?.freedomDate),
                exonerationDate: formatDate(exoneree.caseInfo?.exonerationDate),
                crimeType: formatField(exoneree.caseInfo?.crimeType),
                sentence: formatField(exoneree.caseInfo?.sentence),
            },
            legalInfo: {
                ...exoneree.legalInfo,
                convictionMethod: exoneree.legalInfo?.convictionMethod || [],
                exonerationMethod: formatField(exoneree.legalInfo?.exonerationMethod),
                legalRepresentation: formatField(exoneree.legalInfo?.legalRepresentation),
                prosecutor: formatField(exoneree.legalInfo?.prosecutor),
                officersInvolved: exoneree.legalInfo?.officersInvolved || [],
                originalCharges: exoneree.legalInfo?.originalCharges || [],
                judge: formatField(exoneree.legalInfo?.judge),
            },
            postExonerationInfo: {
                ...exoneree.postExonerationInfo,
                reentrySupport: formatField(exoneree.postExonerationInfo?.reentrySupport),
                publicApology: exoneree.postExonerationInfo?.publicApology ? "Yes" : "No",
                compensationAmount: exoneree.postExonerationInfo?.compensationAmount 
                    ? `$${exoneree.postExonerationInfo.compensationAmount.toLocaleString()}` 
                    : "N/A",
                compensationDate: formatDate(exoneree.postExonerationInfo?.compensationDate),
                occupation: formatField(exoneree.postExonerationInfo?.occupation),
            }
        }));

        // console.log('✅ Formatted API Response:', JSON.stringify(formattedExonerees, null, 2));

        return res.status(200).json({ 
            success: true,
            message: "Exonerees retrieved successfully",
            data: formattedExonerees              
        });
    } catch (error) {
        console.error('🚨 Prisma error:', error);
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
}
