require('dotenv').config();
const dotenv = require('dotenv')
const express = require("express");
const bodyParser = require('body-parser');
const authRouter = require("./routes/userAuth");
const connectToDB = require("./config/database");
const cookieParser = require('cookie-parser')


const app = express();

app.use(bodyParser.json());
app.use(cookieParser());


app.use("/",authRouter);








connectToDB().then(()=>{
    console.log("data base connected succesfully!");
    
    app.listen(3000,()=>{console.log("sever started on 3000")})
}).catch((err)=>{
    console.log(err);
    console.log("DB not connected");
})


