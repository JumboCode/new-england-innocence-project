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
const prisma = new PrismaClient({adapter})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { tag } = req.body;

  if (!tag || typeof tag !== 'string') {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    await prisma.chargesDropdownOption.create({
      data: { name: tag },
    });
    return res.status(200).json({ message: 'Tag added successfully' });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: 'Failed to add tag' });
  }
}











/*import { PrismaClient } from '@prisma/client';
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
const prisma = new PrismaClient({adapter})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    Exoneree,
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
    const newTag = await prisma.ChargesDropdownOption.create({
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

    return res.status(201).json(newTag);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    return res
      .status(400)
      .json({ error: `Failed to create tag: ${errorMessage}` });
  }
}