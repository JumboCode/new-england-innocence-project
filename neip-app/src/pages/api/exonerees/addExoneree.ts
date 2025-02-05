import { PrismaClient } from '@prisma/client';
import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { NextApiRequest, NextApiResponse } from 'next';
import dotenv from 'dotenv'
import ws from 'ws'
dotenv.config()
neonConfig.webSocketConstructor = ws
const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
const adapter = new PrismaNeon(pool)
const prisma = new PrismaClient({ adapter })

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
    const formattedLegalInfo = legalInfo
      ? {
        originalCharges: legalInfo.originalCharges && legalInfo.originalCharges.length > 0
          ? legalInfo.originalCharges.join(", ") // Join if it's an array
          : "", // Default to an empty string if no charges
        convictionMethod: legalInfo.convictionMethod,
        exonerationMethod: legalInfo.exonerationMethod,
        legalRepresentation: legalInfo.legalRepresentation,
        prosecutor: legalInfo.prosecutor,
        detectivesInvolved: legalInfo.detectivesInvolved,
      }
      : undefined;

    const personalInfoData = {
      name: personalInfo.name,
      dateOfBirth: personalInfo.dateOfBirth,
      race: personalInfo.race,
      ethnicity: personalInfo.ethnicity,
      gender: personalInfo.gender,
      ...(personalInfo.address && { address: { create: personalInfo.address } }),
      ...(personalInfo.email && { email: { create: personalInfo.email } }),
      ...(personalInfo.phoneNumber && { phoneNumber: { create: personalInfo.phoneNumber } }),
    };

    // Handle metaData connect/create logic
    const metaDataInput = metaData?.id
      ? { connect: { id: metaData.id } }
      : metaData
        ? {
          create: {
            dataSource: metaData.dataSource,
            lastUpdated: metaData.lastUpdated,
            createdAt: metaData.createdAt, // assuming this is an ISO string
          }
        }
        : undefined;

    const newExoneree = await prisma.exoneree.create({
      data: {
        personalInfo: {
          create: personalInfoData,
        },
        // caseInfo: caseInfo
        //   ? {
        //     create: caseInfo,
        //   }
        //   : undefined,
        // ...(caseInfo && { caseInfo: { create: caseInfo } }),
        caseInfo: caseInfo
          ? {
            create: {
              caseNumber: caseInfo.caseNumber,
              jurisdiction: caseInfo.jurisdiction,
              yearsInPrison: caseInfo.yearsInPrison,
              arrestDate: caseInfo.arrestDate,
              convictionDate: caseInfo.convictionDate,
              freedomDate: caseInfo.freedomDate,
              exonerationDate: caseInfo.exonerationDate,
              crimeType: caseInfo.crimeType,
              sentence: caseInfo.sentence,
              country: caseInfo.country,
              state: caseInfo.state,
            },
          }
          : undefined,
        legalInfo: legalInfo
          ? {
            create: {
              // Handling originalCharges as a joined string if it's an array
              originalCharges: legalInfo.originalCharges && legalInfo.originalCharges.length > 0
                ? legalInfo.originalCharges.join(", ")  // Join if it's an array
                : "",  // Default to an empty string if no charges

              // Apply the same for convictionMethod and exonerationMethod if they are arrays
              convictionMethod: legalInfo.convictionMethod?.length > 0
                ? legalInfo.convictionMethod.join(", ")
                : [""],  // Default to an empty string if no convictionMethod

              exonerationMethod: legalInfo.exonerationMethod?.length > 0
                ? legalInfo.exonerationMethod.join(", ")
                : "",  // Default to an empty string if no exonerationMethod

              legalRepresentation: legalInfo.legalRepresentation || "", // Handle optional fields

              prosecutor: legalInfo.prosecutor || "", // Default to empty string if not provided

              // DetectivesInvolved: Join or leave empty if it's an empty array
              detectivesInvolved: legalInfo.detectivesInvolved?.length > 0
                ? legalInfo.detectivesInvolved.join(", ") // Join if it's an array
                : "", // Default to an empty string if no detectivesInvolved
            },
          }
          : undefined,
        wrongfulConvictionInfo: wrongfulConvictionInfo
          ? {
            create: wrongfulConvictionInfo,
          }
          : undefined,
        postExonerationInfo: postExonerationInfo
          ? {
            create: postExonerationInfo,
          }
          : undefined,
        metaData: metaDataInput,
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
    // const metaDataInput = metaData.id
    //   ? {
    //     connect: { id: metaData.id }, // Connect if ID exists
    //   }
    //   : {
    //     create: metaData, // Create if no ID exists
    //   };

    // const newExoneree = await prisma.exoneree.create({
    //   data: {
    //     personalInfo: {
    //       create: {
    //         name: personalInfo.name,
    //         dateOfBirth: personalInfo.dateOfBirth,
    //         race: personalInfo.race,
    //         ethnicity: personalInfo.ethnicity,
    //         gender: personalInfo.gender,
    //         ...(personalInfo.address && { address: { create: personalInfo.address } }),
    //         ...(personalInfo.email && { email: { create: personalInfo.email } }),
    //         ...(personalInfo.phoneNumber && { address: { create: personalInfo.phoneNumber } }),
    //       }
    //     },
    //     // ...(caseInfo && { caseInfo: { create: caseInfo } }),
    //     // ...(legalInfo && { legalInfo: { create: legalInfo } }),
    //     // ...(wrongfulConvictionInfo && { wrongfulConvictionInfo: { create: wrongfulConvictionInfo } }),
    //     // ...(postExonerationInfo && { postExonerationInfo: { create: postExonerationInfo } }),
    //     // ...(metaDataInput && { metaData: metaDataInput }),
    //     caseInfo: {
    //       create: {
    //         ...(caseInfo && { caseInfo: { create: caseInfo } }),
    //       }
    //     },
    //     legalInfo: {
    //       create: {
    //         ...(legalInfo && { legalInfo: { create: legalInfo } }),
    //       }
    //     },
    //     wrongfulConvictionInfo: {
    //       create: {
    //         ...(wrongfulConvictionInfo && { wrongfulConvictionInfo: { create: wrongfulConvictionInfo } }),
    //       },
    //     },
    //     postExonerationInfo: {
    //       create: {
    //         ...(postExonerationInfo && { postExonerationInfo: { create: postExonerationInfo } }),
    //       }
    //     },
    //     ...(metaDataInput && { metaData: metaDataInput }),
    //   }
    // });
    // include: {
    //   personalInfo: true,
    //     caseInfo: true,
    //       legalInfo: true,
    //         wrongfulConvictionInfo: true,
    //           postExonerationInfo: true,
    //             metaData: true,
    //   };

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