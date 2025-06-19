const mongoose = require('mongoose');

const  movieSchema = new mongoose. Schema({
    moviename:{
          type: String,
          require: true,

    },
    
    movieType:{
        type: String
    },


},{timestamps:true});