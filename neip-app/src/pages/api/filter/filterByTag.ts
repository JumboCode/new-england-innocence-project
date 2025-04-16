import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { value, field, constraint, table } = req.body

  if (!value || !field || !table || !['is', 'is not'].includes(constraint)) {
    return res.status(400).json({ error: 'Invalid or missing parameters' })
  }

  try {
    const normalizedTable = table.toLowerCase()
    let exonereeIds = []

    const filterCondition = constraint === 'is'
      ? { [field]: { has: value } }
      : { NOT: { [field]: { has: value } } }

    if (normalizedTable === 'legalinfo') {
      const exonerees = await prisma.exoneree.findMany({
        where: { legalInfo: filterCondition },
        select: { id: true }
      })
      exonereeIds = exonerees.map(e => e.id)

    } else if (normalizedTable === 'postexonerationinfo') {
      const exonerees = await prisma.exoneree.findMany({
        where: { postExonerationInfo: filterCondition },
        select: { id: true }
      })
      exonereeIds = exonerees.map(e => e.id)

    } else {
      return res.status(400).json({ error: `Table '${table}' not supported for tag filtering` })
    }

    return res.status(200).json(exonereeIds)
  } catch (error) {
    console.error('Filter by tag error:', error)
    return res.status(400).json({ error: `Failed to fetch exonerees: ${error}` })
  }
}
