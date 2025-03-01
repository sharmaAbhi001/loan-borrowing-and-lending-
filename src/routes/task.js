const express = require("express");
const { createUserTask, getAllTask, updateUserTask, deleteUserTask } = require("../controllers/task");





const taskRouter = express.Router();


taskRouter.post("/create/task",createUserTask);
taskRouter.get("/all-task",getAllTask);
taskRouter.patch("/update/task/:id",updateUserTask);
taskRouter.delete("/delete/task/:id",deleteUserTask)




module.exports = taskRouter;