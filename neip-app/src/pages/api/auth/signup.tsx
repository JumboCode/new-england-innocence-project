import { createClerkClient, EmailAddress } from '@clerk/clerk-sdk-node'
import { NextApiRequest, NextApiResponse } from 'next';

const clerkClient = createClerkClient({ secretKey: 'sk_test_t4I1jgHCCDO5CUJ7QzpMuISi7Ko6vLKEZREpN0oX5o' })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {email, password} = req.body;

    if (!email || !password) {
        console.log("Missing email or password.");
        return res.status(400).json({ error: "Email and password are required" });
    }

    const user = clerkClient.users.createUser({
        emailAddress: [email],
        password,
    })

    console.log("User created successfully:", user);
}
    
