import { NextApiRequest, NextApiResponse } from "next";
import { createClerkClient } from "@clerk/clerk-sdk-node";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, newPassword } = req.body;
    console.log(req.body)

    if (!email || !newPassword) {
      return res.status(400).json({ error: "Email and new password are required." });
    }

    const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

    const { data: users } = await clerk.users.getUserList();
    const user = users.find((u) =>
      u.emailAddresses.some((e) => e.emailAddress === email)
    );

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Update password
    await clerk.users.updateUser(user.id, {
      password: newPassword
    });

    return res.status(200).json({ message: "Password successfully updated." });
  } catch (err: any) {
    console.error("Password update error:", err);
    const message =
      err?.errors?.[0]?.message || err?.message || "Internal server error";
    return res.status(500).json({ error: message });
  }
}
