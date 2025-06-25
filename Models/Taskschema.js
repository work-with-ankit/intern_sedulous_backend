const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
     title:{
        type:String,
        requred: true
     },
     status:{
        type:String,
        required:true,
        enum:['pending', 'in-progress', 'completed'],
        default:'pending',

     },
     createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
     },



},{timestamps:true});

module.exports= mongoose.Model("Task", taskSchema);
