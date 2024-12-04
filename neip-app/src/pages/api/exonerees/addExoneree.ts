import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

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
          create: personalInfo,
        },
        caseInfo: {
          create: caseInfo,
        },
        legalInfo: {
          create: legalInfo,
        },
        wrongfulConvictionInfo: {
          create: wrongfulConvictionInfo,
        },
        postExonerationInfo: {
          create: postExonerationInfo,
        },
        metaData: {
          create: metaData,
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
