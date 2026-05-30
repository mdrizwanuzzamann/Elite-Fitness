import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import { sendEmail } from "./utils/sendEmail.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/send/mail", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Please provide all details",
    });
  }

  try {
    await sendEmail({
      email: "mdrizwanuzzaman46@gmail.com",
      subject: "GYM WEBSITE CONTACT",
      message,
      userEmail: email,
    });
    res.status(200).json({
      success: true,
      message: "Message Sent Successfully.",
    });
  } catch (error) {
    console.error(error); // log the actual error
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});