const express = require('express');
const router = express.Router();
const { Login, logoutUser, verifyOtp } = require('../controller/UserController');
const { refreshTokenController } = require('../controller/refreshTokenContoller');
// const { sendOtpController, verifyOtpController } = require('../controller/emailSendotpController');

router.post("/login", Login);
router.post("/refresh-token", refreshTokenController); 
router.post("/logout",logoutUser)
// router.post("/send-otp",sendOtpController);
router.post("/verifyOtp",verifyOtp);

module.exports = router;    
