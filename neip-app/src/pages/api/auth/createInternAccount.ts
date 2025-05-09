import { createClerkClient } from '@clerk/clerk-sdk-node'
import { NextApiRequest, NextApiResponse } from 'next'
import dotenv from 'dotenv'
import crypto from 'crypto';



dotenv.config()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const generatedPassword = crypto.randomBytes(12).toString('base64');

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const clerkClient = createClerkClient({
        secretKey: process.env.CLERK_SECRET_KEY
    })

    const { internName, internEmail } = req.body

    if (!internName || !internEmail) {
        console.log('Missing name or email.')
        return res.status(400).json({ error: 'All fields including name and email required' })
    }

    try {
        console.log("entered here")
        const [firstName, lastName] = internName.split(" ");
        const internUser = await clerkClient.users.createUser({
            emailAddress: [internEmail],
            firstName: firstName,
            lastName: lastName,
            password: generatedPassword,
            publicMetadata: {
                role: "intern"
            }
        })

        const internEmailSubject = "Intern Account Created Confirmation and Password"

        const internEmailBody = `Hi ${internName}! Your account email is ${internEmail} and your password is ${generatedPassword}`

        const sendInternEmail = await fetch(`${baseUrl}/api/auth/sendCustomEmail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: internEmail, emailSubject: internEmailSubject, emailBody: internEmailBody })
        });

        if (!sendInternEmail.ok) {
            const errorDataEmail = await sendInternEmail.json();
            console.error("Signup error", errorDataEmail.error);
            return;
        }

        console.log(`User created successfully: ${internUser}`)
        return res.status(200).json({ success: true, message: 'Intern Account created' })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error: error })
    }
}