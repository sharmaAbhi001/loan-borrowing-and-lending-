const express = require("express");
const { createUserTask, getAllTask } = require("../controllers/task");





const taskRouter = express.Router();


taskRouter.post("/create/task",createUserTask);
taskRouter.get("/all-task",getAllTask);




module.exports = taskRouter;