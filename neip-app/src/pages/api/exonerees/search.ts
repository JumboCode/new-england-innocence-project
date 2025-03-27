// Notes: doesn't search for dates.

import { Prisma } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../utils/database/connectToDb'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { keyword } = req.query

  if (!keyword || typeof keyword !== 'string') {
    return res
      .status(400)
      .json({ error: 'Invalid or missing keyword parameter' })
  }

  let intKeyword: number | null = null
  if (!isNaN(parseInt(keyword))) {
    intKeyword = parseInt(keyword)
  }

  try {
    // Raw SQL queries for matching array fields
    const rawConvictionMethodMatches = await prisma.$queryRaw<{ id: number }[]>(
      Prisma.sql`
        SELECT id
        FROM "LegalInfo"
        WHERE "convictionMethod"::text ILIKE '%' || ${keyword} || '%'
      `
    )
    const rawExonerationMethodMatches = await prisma.$queryRaw<
      { id: number }[]
    >(
      Prisma.sql`
                SELECT id
                FROM "LegalInfo"
                WHERE "exonerationMethod"::text ILIKE '%' || ${keyword} || '%'
            `
    )

    const rawofficersInvolvedMatches = await prisma.$queryRaw<{ id: number }[]>(
      Prisma.sql`
                SELECT id
                FROM "LegalInfo"
                WHERE "officersInvolved"::text ILIKE '%' || ${keyword} || '%'
            `
    )

    const rawReentrySupportMatches = await prisma.$queryRaw<{ id: number }[]>(
      Prisma.sql`
                SELECT id
                FROM "PostExonerationInfo"
                WHERE "reentrySupport"::text ILIKE '%' || ${keyword} || '%'
            `
    )

    // Extract IDs from raw query results
    const convictionMethodIds = rawConvictionMethodMatches.map(
      result => result.id
    )
    const exonerationMethodIds = rawExonerationMethodMatches.map(
      result => result.id
    )
    const officersInvolvedIds = rawofficersInvolvedMatches.map(
      result => result.id
    )
    const reentrySupportIds = rawReentrySupportMatches.map(result => result.id)

    // Main Prisma query with array field matches included
    const results = await prisma.exoneree.findMany({
      where: {
        OR: [
          // { personalInfo: { name: { contains: keyword, mode: 'insensitive' } } },
          // deleting this to make the search less specific
          {
            personalInfo: { name: { startsWith: keyword, mode: 'insensitive' } }
          },
          {
            personalInfo: { race: { contains: keyword, mode: 'insensitive' } }
          },
          {
            personalInfo: {
              ethnicity: { contains: keyword, mode: 'insensitive' }
            }
          },
          {
            personalInfo: {
              phoneNumber: { contains: keyword, mode: 'insensitive' }
            }
          },
          {
            personalInfo: {
              address: { contains: keyword, mode: 'insensitive' }
            }
          },
          {
            personalInfo: { email: { contains: keyword, mode: 'insensitive' } }
          },

          {
            caseInfo: { caseNumber: { contains: keyword, mode: 'insensitive' } }
          },
          {
            caseInfo: { crimeType: { contains: keyword, mode: 'insensitive' } }
          },
          {
            caseInfo: { sentence: { contains: keyword, mode: 'insensitive' } }
          },
          { caseInfo: { country: { contains: keyword, mode: 'insensitive' } } },
          { caseInfo: { state: { contains: keyword, mode: 'insensitive' } } },

          { legalInfo: { originalCharges: { has: keyword } } },
          { legalInfo: { id: { in: convictionMethodIds } } }, // array
          { legalInfo: { id: { in: exonerationMethodIds } } }, // array
          {
            legalInfo: {
              legalRepresentation: { contains: keyword, mode: 'insensitive' }
            }
          },
          {
            legalInfo: {
              prosecutor: { contains: keyword, mode: 'insensitive' }
            }
          },
          {
            legalInfo: {
              judge: { contains: keyword, mode: 'insensitive' }
            }
          },
          { legalInfo: { id: { in: officersInvolvedIds } } }, // array

          { postExonerationInfo: { id: { in: reentrySupportIds } } }, // array
          {
            postExonerationInfo: {
              currentCountry: { contains: keyword, mode: 'insensitive' }
            }
          },
          {
            postExonerationInfo: {
              currentState: { contains: keyword, mode: 'insensitive' }
            }
          },
          {
            postExonerationInfo: {
              occupation: { contains: keyword, mode: 'insensitive' }
            }
          },

          {
            metaData: { dataSource: { contains: keyword, mode: 'insensitive' } }
          },

          // Integer field searches
          ...(intKeyword !== null
            ? [
                { caseInfo: { yearsInPrison: intKeyword } },
                { postExonerationInfo: { compensationAmount: intKeyword } }
              ]
            : [])
        ]
      },
      include: {
        personalInfo: true,
        caseInfo: true,
        legalInfo: true,
        wrongfulConvictionInfo: true,
        postExonerationInfo: true,
        metaData: true
      }
    })
    console.log('Final Query Results:', results) // debugging to check if Prisma found any results
    return res.status(200).json(results.length > 0 ? results : [])
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('Search error:', errorMessage)
    return res
      .status(500)
      .json({ error: `Internal Server Error: ${errorMessage}` })
  }
}
