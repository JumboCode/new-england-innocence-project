import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../utils/database/connectToDb'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { value } = req.body

  console.log(req.body)
  if (!value || typeof value !== 'string') {
    return res.status(400).json({ error: 'Invalid input' })
  }

  try {
    await prisma.chargesDropdownOption.create({
      data: { value: value }
    })
    return res.status(200).json({ message: 'Tag added successfully' })
  } catch (error) {
    console.error(error)
    return res.status(400).json({ error: 'Failed to add tag' })
  }
}
