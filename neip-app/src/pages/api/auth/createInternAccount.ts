import { createClerkClient } from '@clerk/clerk-sdk-node'
import { NextApiRequest, NextApiResponse } from 'next'
import dotenv from 'dotenv'

dotenv.config()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const clerkClient = createClerkClient({
        secretKey: process.env.CLERK_SECRET_KEY
    })

    const { internName, internEmail, internPassword } = req.body

    if (!internName || !internEmail || !internPassword) {
        console.log('Missing name, email, or password.')
        return res.status(400).json({ error: 'All fields are required' })
    }

    try {
        console.log("entered here")
        const [firstName, lastName] = internName.split(" ");
        const internUser = await clerkClient.users.createUser({
            emailAddress: [internEmail],
            firstName: firstName,
            lastName: lastName,
            password: internPassword,
            publicMetadata: {
                role: "intern"
            }
        })

        console.log(`User created successfully: ${internUser}`)
        return res.status(200).json({ success: true, message: 'Intern Account created' })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error: error })
    }
}