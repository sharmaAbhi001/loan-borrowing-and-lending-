const express = require("express");
const bodyParser = require('body-parser');
const authRouter = require("./routes/userAuth");


const app = express();

app.use(bodyParser.json());


app.use("/",authRouter);


app.listen(3000,()=>{console.log("sever started on 3000")
});