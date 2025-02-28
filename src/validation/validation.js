const validation = require("validator")

const userSignupValidation = async (req,res,next)=>{

    
const {firstName,lastName,emailId,password,age} = req.body;

try {

if(!firstName||!lastName)
{
    return res.status(422).json({message:"Name is not valid"});
}
else if(age<18||age>60)
{
    return res.status(422).json({message:"You are not eligiable"});
}
else if(!validation.isEmail(emailId))
{
    return res.status(422).json({message:"Email is not valid"});   
}
else if(!validation.isStrongPassword(password))
{
    return res.status(422).json({message:"Please enter a strong"});  
}

return next();
} catch (error) {
    console.log(error)
    return next(error);

}
};

const allowField = ["gender","photoURL"];

const userProfileUpdateValidation = (req,res,next) =>{

    try {
        const update = Object.keys(req.body);

    const isAllowed = update.every((fields)=> allowField.includes(fields));

    if(!isAllowed)
    {
        return res.status(422).json({message:"Try to update invalid field"});
    }
    } catch (error) {
        return res.status(404).json({message:error})
    }
    
    next();

}

module.exports = {
    userSignupValidation,
    userProfileUpdateValidation
}