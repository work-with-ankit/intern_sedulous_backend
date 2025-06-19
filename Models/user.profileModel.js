const mongoose= require('mongoose');

const UserProfileSchema=  new mongoose.Schema({
    name:{
      type: String,
        required:true,
        trim: true,
    },
    password:{
        type: String,
        required:true,

    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
    },
    gender:{
        type: String,
        enum:["male", "female", "other"],
    },
    qualification:{
        type:String,

    },
    profileImage:{
        url: String,
        public_id: String,
    }
}, {timestamps:true});

module.exports= mongoose.model("Profile", UserProfileSchema);