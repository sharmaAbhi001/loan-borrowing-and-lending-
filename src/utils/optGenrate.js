const Randomstring =require("randomstring")


const genrateOTP = () =>{

return Randomstring.generate({
   
        length: 6,
        charset: 'numeric'

});

}


module.exports = genrateOTP;