import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/database/connectToDb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, badgeNumber, notes, MediaLinks, department, actorName, actorRole } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  let newName = name + ':'
  if (badgeNumber) {
    newName += String(badgeNumber)
  }

  try {

    const existing = await prisma.officer.findUnique({ where: { name: newName } }); 
    if (existing) {
      console.warn('Officer already exists:', newName);
      return res.status(409).json({ error: 'Officer already exists' });
    }

    const officer = await prisma.officer.create({
      data: { name: newName, notes, MediaLinks, department },
    });

    // Build URL for sub-endpoint calls.
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
    const host = req.headers.host || 'localhost:3000'
    const baseUrl = `${protocol}://${host}`

    // Log ADD officer
    await fetch(`${baseUrl}/api/logs/log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `${actorName}`, 
        role: `${actorRole}`,
        action: 'add',
        object: `officer ${newName}`,
        date: new Date().toISOString()
      })
    })

    res.status(201).json(officer);

  } catch (error) {
    console.error("Error while adding officer:", error); // Log the full error for debugging
    res.status(500).json({ error: "Failed to add officer" }); // Return the error message in the response
  }
}
