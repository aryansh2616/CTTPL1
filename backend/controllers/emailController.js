import { sendMail } from "../config/mailer.js";

export const sendEnquiryEmail = async (req, res) => {
  const {
    name,
    email,
    countryCode,
    phone,
    serviceType,
    country,
    date,
    travellers,
    requirements,
  } = req.body;

  if (!name || !email || !phone || !serviceType) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await sendMail({
      to: process.env.RECEIVER_EMAIL || process.env.MAIL_USER,
      subject: `New Enquiry: ${serviceType}`,
      html: `
        <h2>New Enquiry</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${countryCode} ${phone}</p>
        <p><b>Service:</b> ${serviceType}</p>
        <p><b>Country:</b> ${country || "N/A"}</p>
        <p><b>Date:</b> ${date || "N/A"}</p>
        <p><b>Travellers:</b> ${travellers || "N/A"}</p>
        <p><b>Requirements:</b> ${requirements || "N/A"}</p>
        <hr/>
        <p>Sent via choudharytours.in</p>
      `,
    });

    res.status(200).json({ message: "✅ Enquiry sent successfully!" });
  } catch (error) {
    console.error("❌ Mail Error:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
};
