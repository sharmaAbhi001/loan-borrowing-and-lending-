const express = require("express");
const {usersignupHandler, userLoginHandler} = require("../controllers/userAuth");

const authRouter = express.Router();


authRouter.post("/signup",usersignupHandler);
authRouter.post("/login",userLoginHandler)


module.exports = authRouter;