import { NextApiRequest, NextApiResponse } from "next";
import { createClerkClient } from "@clerk/clerk-sdk-node";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

        // Fetch user list
        const { data: users } = await clerk.users.getUserList();

        return res.status(200).json({ users });
    } catch (error) {
        console.error("Check user error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}


//http://localhost:3000/api/auth/getUsers