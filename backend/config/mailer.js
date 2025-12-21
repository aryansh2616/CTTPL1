import nodemailer from "nodemailer";
import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

export const sendMail = async (mailData) => {
  const accessToken = await oauth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // ✅ STARTTLS
    auth: {
      type: "OAuth2",
      user: process.env.MAIL_USER,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken.token, // ✅ MUST be .token
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // ✅ VERIFY MUST BE HERE
  await transporter.verify();
  console.log("✅ SMTP connection verified");

  return transporter.sendMail({
    from: `"Choudhary Tours Enquiry" <${process.env.MAIL_USER}>`,
    ...mailData,
  });
};
