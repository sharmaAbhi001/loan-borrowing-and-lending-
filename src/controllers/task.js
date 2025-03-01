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
            createdByUserId:logedInUSer.id,
            
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
    
        const allTask =   await Task.find({createdByUserId:logedInUSer.id})   
    
        if(!allTask)
        {
            return res.status(200).json({Message:"no task found"});
        }

        return res.status(200).json({task:allTask})
    } catch (error) {
        return res.status(500).json({Message:"internal server error",error});
    }
   
}

// edit task find task by task id which is in req.params 

const updateUserTask = async(req,res) =>{
    
   try {
    const logedInUSer = req.user;
    if(!logedInUSer){
        return res.status(404).json({Message:"login karo yaar"});
    }


    const {title,discription,deadLine,status} = req.body; 

    const taskId = req.params;

   const updatedTask =  await Task.findByIdAndUpdate(taskId.id,{title,discription,deadLine,status},{new:true});

   if(!updatedTask){
    return res.status(404).json({Message:"Invalid Task id"});
   };

   return res.status(200).json({updatedTask})
   } catch (error) {
    return res.status(500).json(error);
   }

}


const deleteUserTask = async(req,res) =>{

   try {
    const logedInUSer = req.user;
    if(!logedInUSer){
        return res.status(404).json({Message:"login kr bsdk"});
    };

const taskId = req.params;

const task =  await Task.findByIdAndDelete(taskId.id,{new:true});

if(task){
return res.status(200).json({Message:"Task deleted successfully"});
}

return res.status(404).json({Message:"Invalid task is "});
   } catch (error) {
    return res.status(500).error
   }
  

}


module.exports = {createUserTask,getAllTask,updateUserTask,deleteUserTask};