import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../utils/database/connectToDb'

type ExonereeResult = { id: number }

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { value, field, constraint, table } = req.body

  try {
    const int_val = parseInt(value)

    if (isNaN(int_val)) {
      return res.status(400).json({ error: 'Invalid integer value' })
    }

    const operatorMap: Record<string, string> = {
      is: '=',
      'is not': '!=',
      '=': '=',
      '!=': '!=',
      '<': '<',
      '<=': '<=',
      '>': '>',
      '>=': '>='
    }

    const sqlOperator = operatorMap[constraint]

    if (!sqlOperator) {
      return res.status(400).json({ error: `Invalid operator: ${constraint}` })
    }

    const lowercaseFirstLetter = (str: string) => {
      return str.charAt(0).toLowerCase() + str.slice(1)
    }

    const tableField = `${lowercaseFirstLetter(table)}Id`

    const query = `
      SELECT "Exoneree".id
      FROM "Exoneree"
      JOIN "${table}" ON "Exoneree"."${tableField}" = "${table}".id
      WHERE "${table}"."${field}"::int != 0
        AND "${table}"."${field}"::int ${sqlOperator} ${int_val}
    `
    

    console.log(`Running query: ${query}`)

    const exonerees = await prisma.$queryRawUnsafe<ExonereeResult[]>(query)
    console.log('Exonerees:', exonerees)

    const exonereeIds = exonerees.map((result: ExonereeResult) => result.id)
    console.log(exonereeIds)
    return res.status(200).json(exonereeIds)
  } catch (error) {
    console.error(error)
    return res.status(400).json({ error: 'Failed to get IDs' })
  }
}
