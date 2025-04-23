import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../utils/database/connectToDb'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { value, field, constraint, model } = req.body

  const constraintMap: Record<'is' | 'is not' | '<' | '<=' | '>' | '>=', string> = {
    'is': '=',
    'is not': '!=',
    '<': '<',
    '<=': '<=',
    '>': '>',
    '>=': '>='
  }

  if (
    !value || !field || !constraint || !model ||
    !(constraint in constraintMap)
  ) {
    return res.status(400).json({ error: 'Missing or invalid filter parameters' })
  }

  const sqlConstraint = constraintMap[constraint as keyof typeof constraintMap]
  const int_val = parseInt(value)

  if (isNaN(int_val)) {
    return res.status(400).json({ error: 'Invalid number input' })
  }

  try {
    const query = `SELECT id FROM "${model}" WHERE "${field}" ${sqlConstraint} ${int_val}`
    const exonerees = await prisma.$queryRawUnsafe<{ id: number }[]>(query)
    const ids = exonerees.map(result => result.id)

    return res.status(200).json({ exonerees: ids })
  } catch (error) {
    console.error(error)
    return res.status(400).json({ error: 'Failed to get IDs' })
  }
}
