const { createToken } = require("../auth/authorization");
const User = require("../models/user");
const bcrypt = require('bcrypt')


const usersignupHandler = async (req,res)=>{

try {
    
    const userDetail = req.body;
    const user = await new User({
        firstName:userDetail.firstName,
        lastName:userDetail.lastName,
        emailId:userDetail.emailId,
        password:userDetail.password,
        age:userDetail.age,

    });
    

    await user.save();
 
    return res.status(201).json({userDetail})

} catch (error) {
    return res.status(401).json(error.errorResponse.errmsg)
    
}};




const userLoginHandler = async (req,res)=>{

   try {
    const user = req.body;

    const userData = await User.findOne({emailId:user.emailId})

    if(!userData){
        res.cookie('token',null,{expires: new Date(Date.noe()) });
        return res.status(404).json({message:"data not foun"})
    }

  const isMatch = await  bcrypt.compare(user.password,userData.password);
  
  if(isMatch){


    const token = createToken(userData);
   res.cookie("token",token)
   return res.status(200).json({message:"User login Successfull"});
    
  }
  else{
    res.cookie('token',null,{expires: new Date(Date.noe()) });
    return res.status(404).json({message:"data not foun"})
  }
   } catch (error) {
    return res.status(404).json({message:error.message})
   }



}



module.exports = {
    usersignupHandler,
    userLoginHandler
};