const bcrypt = require('bcryptjs');
const User = require('../Models/UserModel');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateTokens');
const otpGenerator = require("otp-generator");
const transporter = require("../utils/emailsender");


// Register Controller
const userRegister = async (req, res) => {
    try {
        const { name, email, password, phoneNumber } = req.body;

        if (!name || !email || !password || !phoneNumber) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phoneNumber
        });

        return res.status(201).json({
            status: true,
            message: "User registered successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber
            }
        });

    } catch (error) {
        console.error("Register Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Login Controller
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

   
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });

   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

    // Generate OTP
    const otp = parseInt(otpGenerator.generate(4, {
      digits: true,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false
    }));

    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send OTP Email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP for Login",
      html: `<h2>Your OTP is: <b>${otp}</b></h2>`
    });

    return res.status(200).json({ message: "OTP sent to your email" });

  } catch (error) {
    console.error("Login with OTP Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//  Verify OTP and Login
const verifyOtp = async (req, res) => {
    
  const { otp } = req.body;
  if ( !otp) {
    return res.status(400).json({ message: "OTP is required" });
  }

   const user = await User.findOne({ otp: parseInt(otp) });

  if (
    user.otp !== parseInt(otp) ||
    !user.otpExpiry ||
    user.otpExpiry < Date.now()
  ) {
    return res.status(401).json({ message: "Invalid or expired OTP" });
  }

  
     const accessToken = generateAccessToken(user);
     const refreshToken = generateRefreshToken(user);

  // Clear OTP
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();

  
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 10 * 24 * 60 * 60 * 1000
  });

  return res.status(200).json({
    message: "Login successful",
    token: accessToken
  });
};



const changePassword = async (req, res) => {
    try {
        const { userId } = req.params; 
        const { password, newPassword, confirmPassword } = req.body;

        
        if (!password || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect old password" });
        }

        
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "New passwords do not match" });
        }

        
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        return res.status(200).json({ message: "Password changed successfully" });

    } catch (error) {
        console.error("Change Password Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


const logoutUser= (req, res)=>{
    try {
        res.clearCookie("refreshToken",{
        secure:true,
        httpOnly:true,  
        sameSite: "strict",
    });
     return res.status(200).json({message: "Logout Successful"})
    } catch (error) {
        return res.status(500).json({message: "somtheing went wrong"});
        
    }
} 




module.exports = {
    userRegister,
    Login,
    verifyOtp,
    changePassword,
    logoutUser
};
