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
  
  console.log(req.body);
  if (!value || typeof value !== 'string') {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    await prisma.detectiveDropdownOption.create({
      data: { value: value },
    });
    return res.status(200).json({ message: 'Tag added successfully' });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: 'Failed to add tag' });
  }
}