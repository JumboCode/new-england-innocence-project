// -- look over

import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod';

const Gender = z.enum(["M", "F", "OTHER"]);

const PersonalInfoSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  gender: Gender,
  race: z.string(),
  ethnicity: z.string(),
  phoneNumber: z.string(),
  address: z.string(),
  email: z.string(),
});

const CaseInfoSchema = z.object({
  caseNumber: z.string(),
  jurisdictionId: z.number(),
  yearsInPrison: z.number(),
  arrestDate: z.string(),
  convictionDate: z.string(),
  freedomDate: z.string(),
  exonerationDate: z.string(),
  crimeType: z.string(),
  sentence: z.string(),
  state: z.string(),
  country: z.string(),
});

const LegalInfoSchema = z.object({
  originalCharges: z.string(),
  convictionMethod: z.array(z.string()),
  exonerationMethod: z.array(z.string()),
  legalRepresentation: z.string(),
  prosecutor: z.string(),
  detectivesInvolved: z.array(z.string()),
});

const WrongfulConvictionInfoSchema = z.object({
  falseConfession: z.boolean(),
  eyewitnessMisidentification: z.boolean(),
  inadequateLegalDefense: z.boolean(),
  policeProsecutorialMisconduct: z.boolean(),
  forensicEvidence: z.boolean(),
  informantTestimony: z.boolean(),
});

const PostExonerationInfoSchema = z.object({
  reentrySupport: z.array(z.string()),
  publicApology: z.boolean(),
  compensationAmount: z.number(),
  compensationDate: z.string(),
  occupation: z.string(),
  currentState: z.string(),
  currentCountry: z.string(),
});

const AdditionalInfoSchema = z.object({
  mediaCoverage: z.array(z.string()),
  advocacyInvolvement: z.string(),
  educationalBackground: z.string(),
  healthInfo: z.string(),
});

const MetaDataSchema = z.object({
  dataSource: z.string(),
  lastUpdated: z.string(),
  createdAt: z.string(),
});

const UpdatedExonereeDataSchema = z.object({
  personalInfo: PersonalInfoSchema.optional(),
  caseInfo: CaseInfoSchema.optional(),
  legalInfo: LegalInfoSchema.optional(),
  wrongfulConvictionInfo: WrongfulConvictionInfoSchema.optional(),
  postExonerationInfo: PostExonerationInfoSchema.optional(),
  additionalInfo: AdditionalInfoSchema.optional(),
  metaData: MetaDataSchema.optional(),
});

const prisma = new PrismaClient()

function validateUpdatedData(data: unknown): boolean {
  try {
    UpdatedExonereeDataSchema.parse(data);
    return true;
  } catch (error) {
    console.error('Validation error:', error);
    return false;
  }
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { id, updatedData } = req.body

  if (!id || !updatedData) {
    return res.status(400).json({ error: 'ID and updated data are required' })
  }

  if (!validateUpdatedData(updatedData)) {
    return res.status(400).json({ error: 'Invalid data format' });
  }

  try {
    const existingExoneree = await prisma.exoneree.findUnique({
      where: { id },
      include: {
        personalInfo: true,
        caseInfo: true,
        legalInfo: true,
        wrongfulConvictionInfo: true,
        postExonerationInfo: true,
        metaData: true,
      },
    });

    if (!existingExoneree) {
      return res.status(404).json({ error: 'Exoneree not found' });
    }

    const updatedExoneree = await prisma.exoneree.update({
      where: { id },
      data: {
        personalInfo: updatedData.personalInfo
          ? { update: updatedData.personalInfo }
          : undefined,
        caseInfo: updatedData.caseInfo ? { update: updatedData.caseInfo } : undefined,
        legalInfo: updatedData.legalInfo ? { update: updatedData.legalInfo } : undefined,
        wrongfulConvictionInfo: updatedData.wrongfulConvictionInfo
          ? { update: updatedData.wrongfulConvictionInfo }
          : undefined,
        postExonerationInfo: updatedData.postExonerationInfo
          ? { update: updatedData.postExonerationInfo }
          : undefined,
        metaData: updatedData.metaData ? { update: updatedData.metaData } : undefined,
      },
    });

    return res.status(200).json({ message: 'Exoneree updated successfully', data: updatedExoneree });
  } catch (error: any) {
    console.error('Error updating exoneree:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Exoneree not found' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
}
