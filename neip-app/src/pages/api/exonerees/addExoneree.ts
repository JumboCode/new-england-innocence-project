import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    personalInfo,
    caseInfo,
    legalInfo,
    wrongfulConvictionInfo,
    postExonerationInfo,
    metaData,
  } = req.body;

  if (
    !personalInfo ||
    !caseInfo ||
    !legalInfo ||
    !wrongfulConvictionInfo ||
    !postExonerationInfo ||
    !metaData
  ) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newExoneree = await prisma.exoneree.create({
      data: {
        personalInfo: {
          connectOrCreate: {
            where: { email: personalInfo.email },
            create: personalInfo,
          },
        },
        caseInfo: {
          connectOrCreate: {
            where: { caseNumber: caseInfo.caseNumber }, 
            create: caseInfo,
          },
        },
        legalInfo: {
          connectOrCreate: {
            where: { id: legalInfo.id || 0 }, 
            create: legalInfo,
          },
        },
        wrongfulConvictionInfo: {
          connectOrCreate: {
            where: { id: wrongfulConvictionInfo.id || 0 }, 
            create: wrongfulConvictionInfo,
          },
        },
        postExonerationInfo: {
          connectOrCreate: {
            where: { id: postExonerationInfo.id || 0 },
            create: postExonerationInfo,
          },
        },
        metaData: {
          connectOrCreate: {
            where: { id: metaData.id || 0 },
            create: metaData,
          },
        },
      },
      include: {
        personalInfo: true,
        caseInfo: true,
        legalInfo: true,
        wrongfulConvictionInfo: true,
        postExonerationInfo: true,
        metaData: true,
      },
    });

    return res.status(201).json(newExoneree);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    return res
      .status(400)
      .json({ error: `Failed to create Exoneree: ${errorMessage}` });
  }
}