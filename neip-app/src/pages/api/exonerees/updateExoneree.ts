// -- look over

import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod';

const Gender = z.enum(["M", "F", "OTHER"]);

const PersonalInfoSchema = z.object({
  name: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: Gender.optional(),
  race: z.string().optional(),
  ethnicity: z.string().optional(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  email: z.string().optional(),
});

const CaseInfoSchema = z.object({
  caseNumber: z.string().optional(),
  jurisdictionId: z.number().optional(),
  yearsInPrison: z.number().optional(),
  arrestDate: z.string().optional(),
  convictionDate: z.string().optional(),
  freedomDate: z.string().optional(),
  exonerationDate: z.string().optional(),
  crimeType: z.string().optional(),
  sentence: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
});

const LegalInfoSchema = z.object({
  originalCharges: z.array(z.string()).optional(),
  convictionMethod: z.array(z.string()).optional(),
  exonerationMethod: z.array(z.string()).optional(),
  legalRepresentation: z.string().optional(),
  prosecutor: z.string().optional(),
  detectivesInvolved: z.array(z.string()).optional(),
});

const WrongfulConvictionInfoSchema = z.object({
  falseConfession: z.boolean().optional(),
  eyewitnessMisidentification: z.boolean().optional(),
  inadequateLegalDefense: z.boolean().optional(),
  policeProsecutorialMisconduct: z.boolean().optional(),
  forensicEvidence: z.boolean().optional(),
  informantTestimony: z.boolean().optional(),
});

const PostExonerationInfoSchema = z.object({
  reentrySupport: z.array(z.string()).optional(),
  publicApology: z.boolean().optional(),
  compensationAmount: z.number().optional(),
  compensationDate: z.string().optional(),
  occupation: z.string().optional(),
  currentState: z.string().optional(),
  currentCountry: z.string().optional(),
});

const AdditionalInfoSchema = z.object({
  mediaCoverage: z.array(z.string()).optional(),
  advocacyInvolvement: z.string().optional(),
  educationalBackground: z.string().optional(),
  healthInfo: z.string().optional(),
});

const MetaDataSchema = z.object({
  dataSource: z.string().optional(),
  lastUpdated: z.string().optional(),
  createdAt: z.string().optional(),
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
        metaData: true
      }
    })

    if (!existingExoneree) {
      return res.status(404).json({ error: 'Exoneree not found' })
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
