const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Saare fields required hain",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `📩 New Message from ${name} | Portfolio`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #0a0a0a; border-bottom: 3px solid #64ffda; padding-bottom: 10px;">
            New Portfolio Contact
          </h2>
          <div style="background: white; padding: 20px; border-radius: 8px;">
            <p><strong>👤 Name:</strong> ${name}</p>
            <p><strong>📧 Email:</strong> ${email}</p>
            <p><strong>💬 Message:</strong></p>
            <p style="background: #f0f0f0; padding: 15px; border-radius: 5px;">
              ${message}
            </p>
          </div>
          <p style="color: #888; font-size: 12px; margin-top: 20px;">
            Sent from Portfolio Contact Form
          </p>
        </div>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({
      success: false,
      message: "Email sending failed",
    });
  }
};

module.exports = { sendEmail };
