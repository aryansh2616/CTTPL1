import nodemailer from "nodemailer";

console.log("🔎 ENV CHECK:", {
  host: process.env.BREVO_SMTP_HOST,
  port: process.env.BREVO_SMTP_PORT,
  user: process.env.BREVO_SMTP_USER,
  passLength: process.env.BREVO_SMTP_PASS?.length,
  mailUser: process.env.MAIL_USER,
});

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST, // smtp-relay.brevo.com
  port: Number(process.env.BREVO_SMTP_PORT), // 587
  secure: false, // STARTTLS
  auth: {
    user: process.env.BREVO_SMTP_USER, // "apikey"
    pass: process.env.BREVO_SMTP_PASS, // Brevo API Key
  },
});


export const verifyMailer = async () => {
  await transporter.verify();
  console.log("✅ Brevo SMTP connection verified");
};


export const sendMail = async (mailData) => {
  return transporter.sendMail({
    from: `"Choudhary Tours Enquiry" <${process.env.MAIL_USER}>`,
    ...mailData,
  });
};
