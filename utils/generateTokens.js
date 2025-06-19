const jwt = require('jsonwebtoken');


const generateAccessToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            name: user.name
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    );
};


const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            name: user.name
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '10d' }
    );
};

module.exports = { generateAccessToken, generateRefreshToken };
