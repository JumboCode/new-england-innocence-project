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
            ...(personalInfo.address && { address: personalInfo.address }),
            ...(personalInfo.email && { email: personalInfo.email }),
            ...(personalInfo.phoneNumber && { phoneNumber: personalInfo.phoneNumber }),
            ...(personalInfo.imageURL && { imageURL: personalInfo.imageURL }),
          }
        },
        ...(caseInfo && { caseInfo: { create: caseInfo } }),
        ...(legalInfo && {
            legalInfo: {
              create: {
                originalCharges: legalInfo.originalCharges,
                convictionMethod: legalInfo.convictionMethod,
                exonerationMethod: legalInfo.exonerationMethod,
                legalRepresentation: legalInfo.legalRepresentation,
                policeDepartment: legalInfo.policeDepartment,
                prosecutor: legalInfo.prosecutor,
                judge: legalInfo.judge,
                officersInvolved: legalInfo.officersInvolved
              }
            }
          }),          
        ...(wrongfulConvictionInfo && { wrongfulConvictionInfo: { create: wrongfulConvictionInfo } }),
        ...(postExonerationInfo && { postExonerationInfo: { create: postExonerationInfo } }),
        ...(metaDataInput && { metaData: metaDataInput }),
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
