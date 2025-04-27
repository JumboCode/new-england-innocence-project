import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../utils/database/connectToDb'

// Helper function to validate the date format (YYYY-MM-DD)
const isValidDate = (date: string): boolean => {
  const regex = /^\d{4}-\d{2}-\d{2}$/
  return regex.test(date)
}

type TableName = 'caseInfo' | 'personalInfo' | 'postExonerationInfo'

const tableMapping = {
  caseInfo: prisma.caseInfo,
  personalInfo: prisma.personalInfo,
  postExonerationInfo: prisma.postExonerationInfo
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  // Destructure the request body
  const { value, field, table, constraint } = req.body

  // Validate the input
  if (!value || !field || !constraint || !table) {
    return res
      .status(400)
      .json({ message: 'Missing required fields: value, field, or constraint' })
  }

  const date = value

  if (!isValidDate(date)) {
    return res
      .status(400)
      .json({ message: 'Invalid date format. Use YYYY-MM-DD' })
  }

  if (!['before', 'after'].includes(constraint)) {
    return res
      .status(400)
      .json({ message: 'Constraint must be either "before" or "after"' })
  }

  if (
    !table ||
    !['caseInfo', 'personalInfo', 'postExonerationInfo'].includes(table)
  ) {
    return res.status(400).json({ message: `Invalid table name: "${table}"` })
  }

  const validTable = table as TableName

  const model = tableMapping[validTable]

  try {
    // Construct the Prisma query based on the constraint
    let exonerees
    // const parsedDate = new Date(date);

    if (constraint === 'before') {
      const modelAny = model as any
      exonerees = await modelAny.findMany({
        where: {
          NOT: { [field]: 'N/A' },
          [field]: { lt: date }
        },
        select: { id: true }
      })
    } else if (constraint === 'after') {
      const modelAny = model as any
      exonerees = await modelAny.findMany({
        where: {
          NOT: { [field]: 'N/A' },
          [field]: { gt: date }
        },
        select: { id: true }
      })
    }

    console.log(exonerees)
    if (!exonerees || exonerees.length === 0) {
      return res.status(200).json([])
    }

    // Return the list of Exoneree IDs
    return res
      .status(200)
      .json(exonerees.map((exoneree: { id: number }) => exoneree.id))
  } catch (error) {
    console.error('Error filtering exonerees by date:', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  } finally {
    // Disconnect Prisma Client to avoid keeping open connections
    await prisma.$disconnect()
  }
}
