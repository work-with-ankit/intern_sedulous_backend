// controller/emailOtpController.js

const User = require('../Models/UserModel');
const transporter = require("../utils/emailsender");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");

// Send OTP Controller
const sendOtpController = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Email is not registered" });
  }

  const otp = parseInt(otpGenerator.generate(4, {
    digits: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  }));

  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); 

  try {
    await User.updateOne(
      { email },
      { $set: { otp, otpExpiry } }
    );

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP for Login",
      html: `<h2>Your OTP is: <b>${otp}</b></h2>`,
    });

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Verify OTP Controller
// const verifyOtpController = async (req, res) => {
//   const { email, otp } = req.body;
//   if (!email || !otp) {   
//     return res.status(400).json({ message: "Email and OTP are required" });
//   }

//   const user = await User.findOne({ email });
//   if (!user) {
//     return res.status(400).json({ message: "Email not found" });
//   }

//   if (
//     user.otp !== parseInt(otp) ||
//     !user.otpExpiry ||
//     user.otpExpiry < Date.now()
//   ) {
//     return res.status(400).json({ message: "Invalid or expired OTP" });
//   }

//   const token = jwt.sign(
//     { _id: user._id, email: user.email },
//     process.env.ACCESS_TOKEN_SECRET,
//     { expiresIn: "15m" }
//   );

//   // Clear OTP fields 
//   user.otp = undefined;
//   user.otpExpiry = undefined;
//   await user.save();

//   return res.status(200).json({
//     message: "Login successful",
//     token,
//   });
// };

module.exports = {
  sendOtpController,
};
