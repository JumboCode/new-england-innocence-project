import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../utils/database/connectToDb'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const officers = await prisma.officersDropdownOption.findMany()
    const value = officers.map(officer => officer.value)
    return res.status(200).json(value)
  } catch (error) {
    console.error(error)
    return res.status(400).json({ error: 'Failed to retrieve tags' })
  }
}
