import { NextApiRequest, NextApiResponse } from "next"
import { Resend } from "resend"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });

    }

    const { email, emailSubject, emailBody } = req.body;

    console.log(email)
    console.log(emailBody)
    console.log(emailSubject)

    if (!email || !emailBody || !emailSubject) {
        return res.status(400).json({ error: "Missing email, subject or body" })
    }

    try {
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: emailSubject,
            html: `<p>${emailBody}</p>`
        });

        return res.status(200).json({ message: "Email sent successfully" })

    }
    catch (error) {
        console.error(`Erorr sending email: ${error}`)
        return res.status(500).json({ erorr: "Failed to send email " })
    }
}