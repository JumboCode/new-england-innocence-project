import { createClerkClient, EmailAddress } from '@clerk/clerk-sdk-node'

const clerkClient = createClerkClient({ secretKey: 'sk_test_t4I1jgHCCDO5CUJ7QzpMuISi7Ko6vLKEZREpN0oX5o' })

export default async function handler(req, res) {
    const {email, password} = req.body;

    const user = clerkClient.users.createUser({
        emailAddress: email,
        password: password,
    })
}
    