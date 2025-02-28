const User = require("../models/user");



const updateUserProfile = async (req,res) =>{


  try {
    const logedInUser = req.user;
    const update = req.body;

    if(!logedInUser)
    {
        return res.status(400).json({message:"Login kar bsdk"})
    };
   
    const updateUser = await  User.findByIdAndUpdate(logedInUser.id,update,{new:true});

    if(!updateUser)
    {
        return res.status(404).json({message:"Id nhi hai kya sir"});
    }

    return res.status(201).json({updateUser});
  } catch (error) {
    return res.status(500).json({error});
  }

    
};

const viewUserProfile = async(req,res)=>{

    try {
        const logedInUser = req.user;

    if(!logedInUser)
    {
        return res.status(400).json({message:"Login kar bsdk"})
    };

    const user = await User.findById(logedInUser.id);

    if(!user)
    {
        return res.status(400).json({message:"Login kar bsdk"})
    }

    return res.status(200).json({user})
    } catch (error) {
        return res.status(404).json({error})
    }

}

module.exports = {
    updateUserProfile,
    viewUserProfile,
}