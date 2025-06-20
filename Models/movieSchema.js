const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const  movieSchema = new mongoose. Schema({
    moviename:{
          type: String,
          require: true,

    },

    movieType:{
        type: String
    },
    cast:{
        type:String
    },
     description:{
        type:String,

     },
      slot:[
        {
            time:{
                type:String,
                required:true,
            }
        }
      ]
     , 
     review:[ reviewSchema]

},{timestamps:true});

module.exports= mongoose.model("Movie", movieSchema);