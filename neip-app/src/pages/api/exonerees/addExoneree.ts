import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/database/connectToDb';
import { Prisma } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    personalInfo,
    caseInfo,
    legalInfo,
    wrongfulConvictionInfo,
    postExonerationInfo,
    metaData,
    actorName, 
    actorRole,
  } = req.body;

  if (
    !personalInfo?.name || !personalInfo?.dateOfBirth || !personalInfo?.gender ||
    !personalInfo?.race || !personalInfo?.ethnicity
  ) {
    return res.status(400).json({
      error: 'Missing required fields in Personal Info: Name, Date of birth, Gender, Race, and Ethnicity are required.'
    });
  }

  try {
    const metaDataInput = metaData?.id
      ? { connect: { id: metaData.id } }
      : { create: metaData };

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

    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const host = req.headers.host || 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;

    await fetch(`${baseUrl}/api/logs/log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: actorName, 
        role: actorRole,
        action: 'add',
        object: `exoneree ${personalInfo.name}`,
        date: new Date().toISOString(), 
      })
    });

    return res.status(201).json(newExoneree);
  } catch (error: any) {
    console.error('Error creating Exoneree:', error);

    let message = 'Failed to create Exoneree.';

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        message = `A record with the same ${error.meta?.target} already exists.`;
      } else if (error.code === 'P2025') {
        message = `A required related record was not found: ${error.meta?.cause || 'Unknown'}`;
      } else {
        message = `A database error occurred (code ${error.code}).`;
      }
    } else if (error instanceof Prisma.PrismaClientValidationError) {
      message = 'Some fields contain invalid data. Please check your input and try again.';
    } else if (error instanceof Error) {
      message = error.message;
    }

    return res.status(400).json({ error: message });
  }
}
