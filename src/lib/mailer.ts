
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_APP_PASSWORD?.replace(/\s/g, ""),
  },
});

export async function sendPasswordResetEmail(
  email: string,
  resetUrl: string
) {
  await transporter.sendMail({
    from: `"BazarDor" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "Reset Your BazarDor Password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 550px; margin: auto; padding: 24px;">
        <h2 style="color: #15803d;">বাজার দর</h2>
        <h3>Password Reset Request</h3>
        <p>তোমার BazarDor account-এর password reset করার জন্য নিচের বাটনে ক্লিক করো।</p>
        <a
          href="${resetUrl}"
          style="display: inline-block; padding: 12px 22px; background: #15803d; color: white; text-decoration: none; border-radius: 8px;"
        >
          Reset Password
        </a>
        <p style="margin-top: 20px; color: #666; font-size: 13px;">
          তুমি যদি এই request না করে থাকো, তাহলে email-টি উপেক্ষা করো।
        </p>
      </div>
    `,
  });
}
