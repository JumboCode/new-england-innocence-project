import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../utils/database/connectToDb'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { value, field, constraint, model } = req.body

  try {
    const int_val = parseInt(value)

    if (isNaN(int_val)) {
      return res.status(400).json({ error: 'Invalid integer value' })
    }

    const query = `
      SELECT id
      FROM "${model}"
      WHERE "${field}" ${constraint} ${int_val}
    `

    const exonerees = await prisma.$queryRawUnsafe<{ id: number }[]>(query)

    const ids = exonerees.map(result => result.id)

    return res.status(200).json({ exonerees: ids })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: 'Failed to get IDs' })
  }
}
