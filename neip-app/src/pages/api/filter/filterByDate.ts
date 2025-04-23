import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../utils/database/connectToDb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { value, field, constraint, table } = req.body
  const model = table

  const constraintMap: Record<'is' | 'is not' | '<' | '<=' | '>' | '>=', string> = {
    'is': '=',
    'is not': '!=',
    '<': '<',
    '<=': '<=',
    '>': '>',
    '>=': '>='
  }

  if (value === 'N/A') {
    const query = `
      SELECT id
      FROM "${model}"
      WHERE UPPER(TRIM("${field}")) ${constraint === 'is not' ? '!=' : '='} 'N/A'
    `
    try {
      const results = await prisma.$queryRawUnsafe<{ id: number }[]>(query)
      return res.status(200).json({ exonereeIDs: results.map(r => r.id) })
    } catch (error) {
      console.error(error)
      return res.status(400).json({ error: 'Failed to filter N/A' })
    }
  }  

  if (!value || !field || !constraint || !model || !(constraint in constraintMap)) {
    return res.status(400).json({ error: 'Missing or invalid filter parameters' })
  }

  const sqlConstraint = constraintMap[constraint as keyof typeof constraintMap]

  const isValidDate = (input: string) => {
    const regex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12]?\d|3[01])\/\d{4}$/
    return regex.test(input)
  }

  if (!isValidDate(value)) {
    return res.status(400).json({
      error: 'Invalid date format. Please use MM/DD/YYYY.'
    })
  }

  const [month, day, year] = value.split('/')
  const formattedDate = `${Number(month)}/${Number(day)}/${year}`

  try {
    const query = `
      SELECT id
      FROM "${model}"
      WHERE "${field}" ${sqlConstraint} '${formattedDate}'
    `
    const results = await prisma.$queryRawUnsafe<{ id: number }[]>(query)
    // return res.status(200).json({ exonerees: results.map(r => r.id) })
    return res.status(200).json({ exonereeIDs: results.map(r => r.id) })
  } catch (error) {
    console.error(error)
    return res.status(400).json({ error: 'Failed to filter by date' })
  }
}
