require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

app.post("/send-bulk-email", upload.single("attachment"), async (req, res) => {
  const { emails, subject, message } = req.body;
  const emailList = JSON.parse(emails);
  const attachment = req.file;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: emailList.join(","), // Convert array to string
    subject: subject,
    html: message, // Keeps text formatting
    attachments: attachment
      ? [{ filename: attachment.originalname, path: attachment.path }]
      : [],
  };

  try {
    await transporter.sendMail(mailOptions);
    if (attachment) fs.unlinkSync(attachment.path); // Delete file after sending
    res.json({ success: "Emails sent successfully!" });
  } catch (error) {
    res.json({ error: "Failed to send emails." });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
