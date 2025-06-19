const Profile= require('../Models/user.profileModel');
const cloudinary = require('cloudinary').v2;



const  createProfile = async( req, res)=>{

    try {
         const {name,password, email, profileImage, gender, qualification}= req.body;

         const  userProfile=  await Profile.create({
            name, 
            password,
            email,
            gender,
            qualification,
            profileImage : {
                url:req.imageUrl,
                publicId: req.publicId
            }

         });
         res.status(200).json({message: " user profile created", userProfile})
    } catch (error) {
        res.status(500).json({
            message: "internal server error ", error: error.message
        });
        
    }
};

const updateUserfield  = async( req, res)=>{
    try {
        const id= req.params.id;
        const user= await Profile.findById(id);
        if(!user){
            req.status(400).json({
                message: "User Profile not found",
            });
        }
        const {name, email, password, gender, profileImage, qualification} = req.body;

        if(req.imageUrl && user.profileImage?.public_id ){
            cloudinary.uploader.upload.destroy(user.profileImage.public_id);
             
             user.profileImage= {
                url: req.imageUrl,
                public_id: req.publicId
             };
        }

        user.name= name || user.name;
        user.email=email || user.email; 
        user.password= password || user.password;
        user.gender= gender || user.gender;
        user.qualification = qualification || user. qualification;
        
        await user.save()
        res.status(200).json({
            message: "user updated", user
        });
    } catch (error) {
        res.status(500).json({
            message: " Failed to updated User", error: error.message

        })
        
    }
       
}

module.exports = {createProfile, updateUserfield}