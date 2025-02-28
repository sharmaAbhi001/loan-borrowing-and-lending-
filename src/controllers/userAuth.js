const { createToken } = require("../auth/authorization");
const User = require("../models/user");
const bcrypt = require('bcrypt');
const { userSignupValidation } = require("../validation/validation");
const genrateOTP = require("../utils/optGenrate");
const sendEmail = require("../utils/sendEmail");


const usersignupHandler = async (req,res)=>{

    console.log("hello")

try {  

    const OTP = genrateOTP();

    const userDetail = req.body;


    const existingVerifiedUser = await User.findOne({
        emailId:userDetail.emailId,
    });

    if(existingVerifiedUser){
        if(existingVerifiedUser.isVerified){
            return res.status(500).json({message:"User already exist"});
        }else{
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            existingVerifiedUser.firstName=userDetail.firstName,
            existingVerifiedUser.lastName=userDetail.lastName,
           existingVerifiedUser.password=userDetail.password,
            existingVerifiedUser.age=userDetail.age,
            existingVerifiedUser.verifyCode=OTP,
            existingVerifiedUser.verifyCodeExpiry=expiryDate;

            await existingVerifiedUser.save();
        }
    }else{

        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);

        const user = await new User({
            firstName:userDetail.firstName,
            lastName:userDetail.lastName,
            emailId:userDetail.emailId,
            password:userDetail.password,
            age:userDetail.age,
            verifyCode:OTP,
            verifyCodeExpiry:expiryDate,
    
        });
        await user.save();
    }
          

    await sendEmail({
        to:userDetail.emailId,
        subject:"Task management ",
        message:` <h1>Thank you for registring in our application </h1> <br><p> Your OTP is :<strong>${OTP}</strong></p>`
    });

    
    return res.status(201).json({message:"user created successfully"});

} catch (error) {
    console.log(error)
    return res.status(401).send(error)
    
}};




const userLoginHandler = async (req,res)=>{



   try {
    const user = req.body;

    const userData = await User.findOne({emailId:user.emailId})

    if(!userData){
        res.cookie('token',null,{expires: new Date(Date.now()) });
        return res.status(404).json({message:"Invalid Credential"})
    }

  const isMatch = await  bcrypt.compare(user.password,userData.password);
  
  if(isMatch){


    const token = createToken(userData);
   res.cookie("token",token)
   return res.status(200).json({message:"User login Successfull"});
    
  }
  else{
    res.cookie('token',null,{expires: new Date(Date.now()) });
    return res.status(404).json({message:"Invalid Credential"})
  }
   } catch (error) {
    return res.status(404).json({message:error.message})
   }



}


const userOTPVerificationHandel = async(req,res)=>{

    const {emailId,OTP} = req.body;

    try {

        const existingOTP = await User.findOne({emailId,verifyCode:OTP});

        if(existingOTP){
            existingOTP.isVerified = true;
            await existingOTP.save();

             const token = createToken(existingOTP);
             res.cookie("token",token)
            return res.status(200).json({message:"User verification successfull"});
        }
        return res.status(400).json({message:"please enter a valid otp"});
        
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }


}


module.exports = {
    usersignupHandler,
    userLoginHandler,
    userOTPVerificationHandel
};