const express = require("express");
const {usersignupHandler, userLoginHandler, userOTPVerificationHandel} = require("../controllers/userAuth");
const { userSignupValidation } = require("../validation/validation");

const authRouter = express.Router();


authRouter.post("/signup",userSignupValidation,usersignupHandler);
authRouter.post("/login",userLoginHandler),
authRouter.post("/verify-OTP",userOTPVerificationHandel)


module.exports = authRouter;