const jwt= require('jsonwebtoken');
const {generateAccessToken}= require("../utils/generateTokens");


const  refreshTokenController= async(req, res)=>{
    try {
         const token= req.cookies.refreshToken
         if(!token){
            return res.status(401).json({
                message: "refresh token  not found"
            });
         }

         const decoded= jwt.verify(token,process.env.REFRESH_TOKEN_SECRET);
         const accessToken = generateAccessToken(decoded);

          return res.status(200).json({accessToken});
    } catch (error) {
        return res.status(403).json({message: "invalid or expired refersh token"})
        
    };
}



module.exports= {refreshTokenController};