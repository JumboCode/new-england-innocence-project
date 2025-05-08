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

    const baseCondition = { [field]: { has: value } }

    const filterCondition = constraint === 'is'
      ? baseCondition
      : { NOT: baseCondition }

    let whereClause: any = {}
    if (normalizedTable === 'legalinfo') {
      whereClause = { legalInfo: filterCondition }
    } else if (normalizedTable === 'postexonerationinfo') {
      whereClause = { postExonerationInfo: filterCondition }
    } else {
      return res.status(400).json({ error: `Table '${table}' not supported for tag filtering` })
    }

    const exonerees = await prisma.exoneree.findMany({
      where: whereClause,
      select: { id: true }
    })

    exonereeIds = exonerees.map(e => e.id)
    return res.status(200).json(exonereeIds)
  } catch (error) {
    console.error('Filter by tag error:', error)
    return res.status(400).json({ error: `Failed to fetch exonerees: ${error}` })
  }
}
