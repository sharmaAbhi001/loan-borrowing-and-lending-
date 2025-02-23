const express = require("express");
const usersignupHandler = require("../controllers/userAuth");

const authRouter = express.Router();


authRouter.post("/signup",usersignupHandler);


module.exports = authRouter;