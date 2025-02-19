import { createClerkClient } from '@clerk/clerk-sdk-node'
import { NextApiRequest, NextApiResponse } from 'next'
import dotenv from 'dotenv'

dotenv.config()

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY
  })

  const { email, password } = req.body

  if (!email || !password) {
    console.log('Missing email or password.')
    return res.status(400).json({ error: 'Email and password are required' })
  }

  if (!email.endsWith('@newenglandinnocence.org')) {
    console.log('Invalid email domain.');
    return res.status(400).json({ error: 'Only @newenglandinnocence.org emails are allowed' });
  }

  try {
    // added to ensure creation process is working
    const user = await clerkClient.users.createUser({
      emailAddress: [email],
      password: password
    })

    console.log('User created successfully:', user)
    return res.status(200).json({ success: true, message: 'Verification email sent' })
  } catch (error) {
    console.error('User creation error:', error)
    return res.status(500).json({ error: error })
  }
}
