const express = require("express");
const { userProfileUpdateValidation } = require("../validation/validation");
const { updateUserProfile,viewUserProfile } = require("../controllers/profile");





const profileRouter = express.Router();

profileRouter.get("/view/profile",viewUserProfile)
profileRouter.patch("/update/profile",userProfileUpdateValidation,updateUserProfile)





module.exports = profileRouter;