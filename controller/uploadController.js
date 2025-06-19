const { v2: cloudinary } = require('cloudinary');
const uploadOnCloudinary = require("../utils/cloudinary");
const Image = require("../Models/Images.Models");
const fs = require("fs");

const uploadFileController = async (req, res) => {
  try {
    const localFilePath = req.file.path;
    
    const cloudinaryResponse = await uploadOnCloudinary(localFilePath);
    
    if (!cloudinaryResponse) {
      return res.status(500).json({ message: "Cloudinary upload failed" });
    }

    const savedImage = await Image.create({
      url: cloudinaryResponse.secure_url,
      public_id: cloudinaryResponse.public_id,
    });

    
   try {
  fs.unlinkSync(localFilePath);
  console.log("Local file deleted successfully.");
} catch (err) {
  console.error("Failed to delete local file:", err.message);
}


   return  res.status(200).json({
      message: "Image uploaded and saved in DB successfully",
      data: savedImage,
    }); 

  } catch (error) {
    console.log(" Error in uploadFileController:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const imagedelete = async(req, res)=>{
  try {
     const Id= req.params.id;

     const image = await Image.findById(Id);

     if(!image){
      return req.status(400).json({
        message:"image is not found in database"
      })
     }

     await cloudinary.uploader.destroy(image.public_id);

     await  image.deleteOne();  

     return res.status(200).json({
      message: "image delete successfully on clodianry and mongodb"
     });
  } catch (error) {
     res.status(500).json({
      message: "failed to delete image ", error: error.message
     });
  }

}

const imageupdate= async(req, res)=>{
  try {
    
    const Id = req.params.id;
    const image = await  Image.findById(Id);
    if(!image){
      return res.status(400).json({
        message:"image not found on Cloudinary and mongodb"
      });
    }
       await cloudinary.uploader.destroy(image.public_id);

       const newFilePath= req.file.path;
       
       const cloudinaryResponse= await uploadOnCloudinary(newFilePath);

        if(!cloudinaryResponse){
           return req.status(500).json({
            message: " cloudinary upload failed"
           });
          }

        
          
          image.url= cloudinaryResponse.secure_url;   // mongodb update url document
          image.public_id= cloudinaryResponse.public_id;
           await  image.save(); 

           res.status(200).json({
            message: "image update successfully",
            data: image
           });

  } catch (error) {
    res.status(500).json({
      message: " Something went wrong ", error: error.message
    });
    
  }

}
module.exports = { uploadFileController, imagedelete ,imageupdate};
