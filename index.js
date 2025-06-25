require('dotenv').config();
const express= require('express');
const db= require("./config/db");
const router = require('./Routes/routes');
const cookieParser= require('cookie-parser');


const port= process.env.PORT || 3000;


const app= express();
db();


app.use(express.json());
app.use(cookieParser());

app.use("/api",router);



app.listen(port, ()=>{
    console.log(`server is listen ${port}`)
});