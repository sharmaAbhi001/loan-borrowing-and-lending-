const jwt = require("jsonwebtoken");





const createToken = (userData) =>{

    const payload ={
        firstName:userData.firstName,
        lastName:userData.lastName,
        emailId:userData.emailId,
        id:userData._id
    }
const token = jwt.sign(payload,process.env.secrate_key_JWT,{expiresIn:'1h'})
return token

};

const validateToken = (token) =>{

    try {
        const payload = jwt.verify(token,process.env.secrate_key_JWT);
        return payload;
    } catch (error) {
        throw new Error("Invalid token"); 
    }

}


module.exports ={
    createToken,
    validateToken
}