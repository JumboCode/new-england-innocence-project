import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/database/connectToDb'

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
    !personalInfo.name || !personalInfo.dateOfBirth || !personalInfo.gender ||
    !personalInfo.race || !personalInfo.ethnicity
  ) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const metaDataInput = metaData.id
      ? {
        connect: { id: metaData.id }, // Connect if ID exists
      }
      : {
        create: metaData, // Create if no ID exists
      };

    const newExoneree = await prisma.exoneree.create({
      data: {
        personalInfo: {
          create: {
            name: personalInfo.name,
            dateOfBirth: personalInfo.dateOfBirth,
            race: personalInfo.race,
            ethnicity: personalInfo.ethnicity,
            gender: personalInfo.gender,
            ...(personalInfo.address && { address: { create: personalInfo.address } }),
            ...(personalInfo.email && { email: { create: personalInfo.email } }),
            ...(personalInfo.phoneNumber && { address: { create: personalInfo.phoneNumber } }),
          }
        },
        ...(caseInfo && { caseInfo: { create: caseInfo } }),
        ...(legalInfo && { legalInfo: { create: legalInfo } }),
        ...(wrongfulConvictionInfo && { wrongfulConvictionInfo: { create: wrongfulConvictionInfo } }),
        ...(postExonerationInfo && { postExonerationInfo: { create: postExonerationInfo } }),
        ...(metaDataInput && { metaData: metaDataInput }),


        // caseInfo: {
        //   create: {
        //     ...(caseInfo && { caseInfo: { create: caseInfo } }),
        //   }
        // },
        // legalInfo: {
        //   create: {
        //     ...(legalInfo && { legalInfo: { create: legalInfo } }),
        //   }
        // },
        // wrongfulConvictionInfo: {
        //   create: {
        //     ...(wrongfulConvictionInfo && { wrongfulConvictionInfo: { create: wrongfulConvictionInfo } }),
        //   },
        // },
        // postExonerationInfo: {
        //   create: {
        //     ...(postExonerationInfo && { postExonerationInfo: { create: postExonerationInfo } }),
        //   }
        // },
        // ...(metaDataInput && { metaData: metaDataInput }),


        // include: {
        // personalInfo: true,
        // caseInfo: true,
        // legalInfo: true,
        // wrongfulConvictionInfo: true,
        // postExonerationInfo: true,
        // metaData: true,
        // },
      }
    });

    return res.status(201).json(newExoneree);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    console.log(error);
    return res
      .status(400)
      .json({ error: `Failed to create Exoneree: ${errorMessage}` });
  }
}