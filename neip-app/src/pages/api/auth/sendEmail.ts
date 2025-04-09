import { NextApiRequest, NextApiResponse } from "next"
import { Resend } from "resend"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });

    }

    const { email, verificationCode } = req.body;

    console.log(email)
    console.log(verificationCode)

    if (!email || !verificationCode) {
        return res.status(400).json({ error: "Missing email or verification code" })
    }

    try {
        const resend = new Resend(process.env.RESEND_API_KEY);



        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Your Verification Code',
            html: `<p>Your verification code is: <strong>${verificationCode}</strong></p>`
        });

        return res.status(200).json({ message: "Email sent successfully" })

    }
    catch (error) {
        console.error(`Erorr sending email: ${error}`)
        return res.status(500).json({ erorr: "Failed to send email " })
    }
}