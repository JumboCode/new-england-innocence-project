import { createClerkClient } from '@clerk/clerk-sdk-node'
import { NextApiRequest, NextApiResponse } from 'next'
import dotenv from 'dotenv'


dotenv.config()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const clerkClient = createClerkClient({
        secretKey: process.env.CLERK_SECRET_KEY
    })


    const { userId } = req.body

    if (!userId) {
        console.log('Missing  user id.')
        return res.status(400).json({ error: 'Tzhe user id is required.' })
    }

    try {

        const response = await clerkClient.users.deleteUser(userId)

        console.log('Intern account deleted successfully:', response)
        return res.status(200).json({ message: `Intern account deleted successfully:, ${response}` })
    } catch (error) {
        console.error('Unable to delete user:', error)
        return res.status(500).json({ error: error })
    }
}