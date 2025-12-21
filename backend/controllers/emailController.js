import { sendMail } from "../config/mailer.js";

export const sendEnquiryEmail = async (req, res) => {
  try {
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
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    await sendMail({
      to: process.env.RECEIVER_EMAIL || process.env.MAIL_USER,

      replyTo: email,

      subject: `New Enquiry: ${serviceType}`,

      text: `
New Enquiry Received

Name: ${name}
Email: ${email}
Phone: ${countryCode || ""} ${phone}
Service: ${serviceType}
Country: ${country || "N/A"}
Date: ${date || "N/A"}
Travellers: ${travellers || "N/A"}
Requirements: ${requirements || "N/A"}
      `,

      html: `
        <h2>📩 New Enquiry</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${countryCode || ""} ${phone}</p>
        <p><b>Service:</b> ${serviceType}</p>
        <p><b>Country:</b> ${country || "N/A"}</p>
        <p><b>Date:</b> ${date || "N/A"}</p>
        <p><b>Travellers:</b> ${travellers || "N/A"}</p>
        <p><b>Requirements:</b> ${requirements || "N/A"}</p>
        <hr />
        <p style="font-size:12px;color:#777;">
          Sent via <b>choudharytours.in</b>
        </p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "✅ Enquiry sent successfully!",
    });
  } catch (error) {
    console.error("❌ Mail Error:", error?.message || error);

    return res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
};
