// pages/api/jurisdiction/addJurisdiction.ts
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

  const { value } = req.body;

  if (!value || typeof value !== 'string') {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    // Check if the jurisdiction already exists
    const existingJurisdiction = await prisma.jurisdictionDropdownOption.findUnique({
      where: { value },
    });

    if (existingJurisdiction) {
      return res.status(409).json({ error: 'Jurisdiction already exists' });
    }

    // Insert the new jurisdiction
    await prisma.jurisdictionDropdownOption.create({
      data: { value },
    });

    return res.status(200).json({ message: 'Jurisdiction added successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}