import { NextApiRequest, NextApiResponse } from "next";
import { createClerkClient } from "@clerk/clerk-sdk-node";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { email, newPassword } = req.body;
        if (!email && !newPassword) {
            return res.status(400).json({ error: "Your email and new password is required" });
        }

        const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

        // Fetch user list
        const { data: users } = await clerk.users.getUserList();
        const user = users.find((user) =>
            user.emailAddresses.some((emailAddress) => emailAddress.emailAddress === email)
        );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const updatedUser = await clerk.users.updateUser(user.id, {
            password: email,
        });



        return res.status(200).json({ message: `Your password has changed! ${updatedUser}` });
    } catch (error) {
        console.error("Check user error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}