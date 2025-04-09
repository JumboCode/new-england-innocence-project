import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/database/connectToDb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, notes, MediaLinks, department } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  // Ensure MediaLinks is an array
  if (!Array.isArray(MediaLinks)) {
    return res.status(400).json({ error: 'MediaLinks must be an array of strings' });
  }

  try {
    const officer = await prisma.officer.create({
      data: { name, notes, MediaLinks, department },
    });

    res.status(201).json(officer);

  } catch (error) {
    console.error("Error while adding officer:", error); // Log the full error for debugging
    res.status(500).json({ error: "Failed to add officer" }); // Return the error message in the response
  }
}
