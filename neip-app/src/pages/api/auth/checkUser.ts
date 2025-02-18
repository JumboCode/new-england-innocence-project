import { NextApiRequest, NextApiResponse } from "next";
import { createClerkClient } from "@clerk/clerk-sdk-node";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

    // Fetch user list
    const { data: users } = await clerk.users.getUserList();
    const user = users.find((u) =>
      u.emailAddresses.some((e) => e.emailAddress === email)
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const emailVerified = user.emailAddresses.some(
      (e) => e.emailAddress === email && e.verification?.status === "verified"
    );

    return res.status(200).json({ exists: true, emailVerified });
  } catch (error) {
    console.error("Check user error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
