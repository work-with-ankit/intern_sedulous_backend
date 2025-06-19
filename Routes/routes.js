const express = require('express');
const router = express.Router();


const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');


router.use('/auth', authRoutes);   // /api/auth/login , /api/auth/refresh-token
router.use('/user', userRoutes);   // /api/user/register, /api/user/change-password 

module.exports = router;
