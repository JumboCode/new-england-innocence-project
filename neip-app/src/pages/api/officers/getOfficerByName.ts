import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/database/connectToDb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Ensure that the request is a GET method
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Retrieve the 'name' parameter from the query string
  const { name } = req.query;

  // If no name is provided or it's not a valid string, return an error
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Valid name is required' });
  }

  try {
    // Query the officer from the database based on the name
    const officer = await prisma.officer.findUnique({
      where: { name: name },
    });

    // If officer is not found, return an error message
    if (!officer) {
      return res.status(404).json({ error: 'Officer not found' });
    }

    // Return the officer data as a JSON response
    res.status(200).json(officer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve officer' });
  }
}
