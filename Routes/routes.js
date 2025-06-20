const express = require('express');
const router = express.Router();


const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const movieRoutes= require('./movieRoutes');


router.use('/auth', authRoutes);   // /api/auth/login , /api/auth/refresh-token
router.use('/user', userRoutes);   // /api/user/register, /api/user/change-password 
router.use('/movie', movieRoutes);

module.exports = router;
