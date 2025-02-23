const User = require("../models/user");



const usersignupHandler = async (req,res)=>{

try {
    
    const userDetail = req.body;

    console.log(userDetail.firstName);
    
    

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
    console.log(error);
    
}


};



module.exports = usersignupHandler;