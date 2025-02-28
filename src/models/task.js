const { Schema, Types, default: mongoose } = require("mongoose");



const taskSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    discription:{
        type:String,
    },
    status:{
        type:String,
        enum:["start","inprogress","complete"],
        default:"start"
    },
    type:{
        type:String,
        enum:["primary","secondary"],
        required:true,
    },
    createdByUserId:{
        type:Schema.Types.ObjectId,ref:"User",
        required:true,
    },
    deadLine:{
        type:Date,
    },
    createdAt:{
        type:Date,
        default: Date.now()
    }
});



const Task = mongoose.model.Task || new mongoose.model("Task",taskSchema);

module.exports  = Task

