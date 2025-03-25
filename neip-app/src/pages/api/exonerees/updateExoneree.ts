// -- look over

import { prisma } from '../../../utils/database/connectToDb'
import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

const Gender = z.enum(['M', 'F', 'OTHER'])

const PersonalInfoSchema = z.object({
  name: z.union([z.string().length(0), z.string()]).optional(),
  dateOfBirth: z.union([z.string().length(0), z.string()]).optional(),
  gender: Gender.or(z.literal('')),
  race: z.union([z.string().length(0), z.string()]).optional(),
  ethnicity: z.union([z.string().length(0), z.string()]).optional(),
  phoneNumber: z.union([z.string().length(0), z.string()]).optional(),
  address: z.union([z.string().length(0), z.string()]).optional(),
  email: z.union([z.string().length(0), z.string()]).optional(),
});

const CaseInfoSchema = z.object({
  caseNumber: z.union([z.string().length(0), z.string()]).optional(),
  jurisdictionId: z.number().or(z.literal('')),
  yearsInPrison: z.number().or(z.literal('')),
  arrestDate: z.union([z.string().length(0), z.string()]).optional(),
  convictionDate: z.union([z.string().length(0), z.string()]).optional(),
  freedomDate: z.union([z.string().length(0), z.string()]).optional(),
  exonerationDate: z.union([z.string().length(0), z.string()]).optional(),
  crimeType: z.union([z.string().length(0), z.string()]).optional(),
  sentence: z.union([z.string().length(0), z.string()]).optional(),
  state: z.union([z.string().length(0), z.string()]).optional(),
  country: z.union([z.string().length(0), z.string()]).optional(),
});

const LegalInfoSchema = z.object({
  originalCharges: z.array(z.string()).or(z.literal('')).optional(),
  convictionMethod: z.array(z.string()).or(z.literal('')).optional(),
  exonerationMethod: z.array(z.string()).or(z.literal('')).optional(),
  legalRepresentation: z.union([z.string().length(0), z.string()]).optional(),
  prosecutor: z.union([z.string().length(0), z.string()]).optional(),
  officersInvolved: z.array(z.string()).or(z.literal('')).optional(),
});

const WrongfulConvictionInfoSchema = z.object({
  falseConfession: z.boolean().or(z.literal('')),
  eyewitnessMisidentification: z.boolean().or(z.literal('')),
  inadequateLegalDefense: z.boolean().or(z.literal('')),
  policeProsecutorialMisconduct: z.boolean().or(z.literal('')),
  forensicEvidence: z.boolean().or(z.literal('')),
  informantTestimony: z.boolean().or(z.literal('')),
});

const PostExonerationInfoSchema = z.object({
  reentrySupport: z.array(z.string()).or(z.literal('')).optional(),
  publicApology: z.boolean().or(z.literal('')),
  compensationAmount: z.number().or(z.literal('')),
  compensationDate: z.union([z.string().length(0), z.string()]).optional(),
  occupation: z.union([z.string().length(0), z.string()]).optional(),
  currentState: z.union([z.string().length(0), z.string()]).optional(),
  currentCountry: z.union([z.string().length(0), z.string()]).optional(),
});

const AdditionalInfoSchema = z.object({
  mediaCoverage: z.union([z.string().length(0), z.string()]).optional(),
  advocacyInvolvement: z.union([z.string().length(0), z.string()]).optional(),
  educationalBackground: z.union([z.string().length(0), z.string()]).optional(),
  // healthInfo: z.union([z.string().length(0), z.string()]).optional(),
  healthInfo: z.union([z.string().length(0), z.string()]).optional()
});

const MetaDataSchema = z.object({
  dataSource: z.union([z.string().length(0), z.string()]).optional(),
  lastUpdated: z.union([z.string().length(0), z.string()]).optional(),
  createdAt: z.union([z.string().length(0), z.string()]).optional(),
});

const UpdatedExonereeDataSchema = z.object({
  personalInfo: PersonalInfoSchema.optional(),
  caseInfo: CaseInfoSchema.optional(),
  legalInfo: LegalInfoSchema.optional(),
  wrongfulConvictionInfo: WrongfulConvictionInfoSchema.optional(),
  postExonerationInfo: PostExonerationInfoSchema.optional(),
  additionalInfo: AdditionalInfoSchema.optional(),
  metaData: MetaDataSchema.optional()
})

function validateUpdatedData (data: unknown): boolean {
  try {
    UpdatedExonereeDataSchema.parse(data)
    return true
  } catch (error) {
    console.error('Validation error:', error)
    return false
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
    return res.status(400).json({ error: 'Invalid data format' })
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
        caseInfo: updatedData.caseInfo
          ? { update: updatedData.caseInfo }
          : undefined,
        legalInfo: updatedData.legalInfo
          ? { update: updatedData.legalInfo }
          : undefined,
        wrongfulConvictionInfo: updatedData.wrongfulConvictionInfo
          ? { update: updatedData.wrongfulConvictionInfo }
          : undefined,
        postExonerationInfo: updatedData.postExonerationInfo
          ? { update: updatedData.postExonerationInfo }
          : undefined,
        metaData: updatedData.metaData
          ? { update: updatedData.metaData }
          : undefined
      }
    })

    return res
      .status(200)
      .json({ message: 'Exoneree updated successfully', data: updatedExoneree })
    } catch (error) {
      console.error('Error updating exoneree:', error);
    
      if ((error as { code?: string }).code === 'P2025') {
        return res.status(404).json({ error: 'Exoneree not found' });
      }
    
      return res.status(500).json({ error: 'Internal server error' });
    }
    
}
