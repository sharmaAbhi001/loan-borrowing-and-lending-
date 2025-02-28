const Task = require("../models/task");





const createUserTask = async (req,res) =>{

  try {
    const logedInUSer = req.user;

    if(!logedInUSer){
        return res.status(404).json({Message:"bhaag ja pahile login kar"});
    };
    
    const {title,discription,status,type,deadLine} = req.body;

       const task =   await new Task({
            title,
            discription,
            status,
            type,
            deadLine,
            createdByUserId:logedInUSer._id,
            
         });

         await task.save();

         return res.status(201).json({Message:"task added successfully"});
  } catch (error) {
    return res.status(500).json({Message:"internal server error ",error});
  }
}



const getAllTask = async (req,res)=>{

    try {
        const logedInUSer = req.user;
        if(!logedInUSer){
            return res.status(404).json({Message:"login kr bsdk"});
        };
    
        const allTask =   await Task.find({createdByUserId:logedInUSer._id}).populate("User", "firstName" );   
    
        if(!allTask)
        {
            return res.status(200).json({Message:"no task found"});
        }

        return res.status(200).json(allTask)
    } catch (error) {
        return res.status(500).json({Message:"internal server error",error});
    }
   
}


module.exports = {createUserTask,getAllTask};