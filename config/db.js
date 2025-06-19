const mongoose= require('mongoose');

      const connectDB= async()=>{
try {
        const conn= await mongoose.connect("mongodb+srv://ankit123:ankit12345@cluster0.9lawdet.mongodb.net/");
     console.log(" mongoDB connected");
    
} catch (error) {
    console.log("something went Wrongh", error);
    
}        
      }

      module.exports= connectDB;