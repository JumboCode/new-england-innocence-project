// -- look over

import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

enum Gender {
  M = "M",
  F = "F",
  OTHER = "OTHER",
}



const prisma = new PrismaClient();

function validateUpdatedData(data: any): boolean {
  if (typeof data !== 'object' || data === null) return false;

  // Validate each property
  if (typeof data.personalInfo.name !== 'string') return false;
  if (typeof data.personalInfo.race !== 'string') return false;
  if (typeof data.personalInfo.ethnicity !== 'string') return false;
  if (typeof data.personalInfo.phoneNumber !== 'string') return false;
  if (typeof data.personalInfo.address !== 'string') return false;
  if (typeof data.personalInfo.email !== 'string') return false;
  if (typeof data.caselInfo.caseNumber !== 'string') return false;
  if (typeof data.caselInfo.crimeType !== 'string') return false;
  if (typeof data.caselInfo.sentence !== 'string') return false;
  if (typeof data.caselInfo.state !== 'string') return false;
  if (typeof data.caselInfo.country !== 'string') return false;
  if (typeof data.legalInfo.originalCharges !== 'string') return false;
  if (typeof data.legalInfo.legalRepresentation !== 'string') return false;
  if (typeof data.legalInfo.prosecutor !== 'string') return false;
  if (typeof data.additionalInfo.advocacyInvolvement !== 'string') return false;
  if (typeof data.additionalInfo.educationalBackground !== 'string') return false;
  if (typeof data.additionalInfo.healthInfo !== 'string') return false;
  if (typeof data.metaData.dataSource !== 'string') return false;


  if (typeof data.caselInfo.jurisdictionId !== 'number') return false;
  if (typeof data.caselInfo.yearsInPrison !== 'number') return false;
  if (typeof data.postExonerationlInfo.compensationAmount !== 'number') return false;


  if (!(data.personalInfo.dateOfBirth instanceof Date) || isNaN(data.personalInfodateOfBirth.getTime())) return false;
  if (!(data.caseInfo.arrestDate instanceof Date) || isNaN(data.caseInfo.arrestDate.getTime())) return false;
  if (!(data.caseInfo.convictionDate instanceof Date) || isNaN(data.caseInfo.convictionDate.getTime())) return false;
  if (!(data.caseInfo.freedomDate instanceof Date) || isNaN(data.caseInfo.freedomDate.getTime())) return false;
  if (!(data.caseInfo.exonerationDate instanceof Date) || isNaN(data.caseInfo.exonerationDate.getTime())) return false;
  if (!(data.postExonerationInfo.compensationDate instanceof Date) || isNaN(data.postExonerationInfo.compensationDate.getTime())) return false;
  if (!(data.metaData.lastUpdated instanceof Date) || isNaN(data.metaData.lastUpdated.getTime())) return false;
  if (!(data.metaData.createdAt instanceof Date) || isNaN(data.metaData.createdAt.getTime())) return false;


  if (typeof data.wrongfulConvictionInfo.falseConfession !== 'boolean') return false;
  if (typeof data.wrongfulConvictionInfo.eyewitnessMisidentification !== 'boolean') return false;
  if (typeof data.wrongfulConvictionInfo.inadequateLegalDefense !== 'boolean') return false;
  if (typeof data.wrongfulConvictionInfo.policeProsecutorialMisconduct !== 'boolean') return false;
  if (typeof data.wrongfulConvictionInfo.forensicEvidence !== 'boolean') return false;
  if (typeof data.wrongfulConvictionInfo.informantTestimony !== 'boolean') return false;
  if (typeof data.postExonerationInfo.publicApology !== 'boolean') return false;


  if (!(Object.values(Gender).includes(data.personalInfo.gender))) return false;


  if (typeof data.legalInfo.convictionMethod !== 'object') {
    let arr_length = data.legalInfo.convictionMethod.length;
    for (let i = 0; i < arr_length; i++) {
      if (typeof data.legalInfo.convictionMethod[i] !== "string") return false
    }
  }
  else {
    return false;
  }

  if (typeof data.legalInfo.exonerationMethod !== 'object') {
    let arr_length = data.legalInfo.exonerationMethod.length;
    for (let i = 0; i < arr_length; i++) {
      if (typeof data.legalInfo.exonerationMethod[i] !== "string") return false
    }
  }
  else {
    return false;
  }

  if (typeof data.legalInfo.detectivesInvolved !== 'object') {
    let arr_length = data.legalInfo.detectivesInvolved.length;
    for (let i = 0; i < arr_length; i++) {
      if (typeof data.legalInfo.detectivesInvolved[i] !== "string") return false
    }
  }
  else {
    return false;
  }

  if (typeof data.postExonerationInfo.reentrySupport !== 'object') {
    let arr_length = data.postExonerationInfo.reentrySupport.length;
    for (let i = 0; i < arr_length; i++) {
      if (typeof data.postExonerationInfo.reentrySupport[i] !== "string") return false
    }
  }
  else {
    return false;
  }

  if (typeof data.additionalInfo.mediaCoverage !== 'object') {
    let arr_length = data.additionalInfo.mediaCoverage.length;
    for (let i = 0; i < arr_length; i++) {
      if (typeof data.additionalInfo.mediaCoverage[i] !== "string") return false
    }
  }
  else {
    return false;
  }


  return true;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id, updatedData } = req.body;

  if (!id || !updatedData) {
    return res.status(400).json({ error: 'ID and updated data are required' });
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
