import mongoose from "mongoose"
const taskSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true,
    },
    descripton: {
        type:String,

    },
    priority: {
        type:String,
        enum:["low","medium","high"],
        default:"low",
    },
    status: {
        type:String,
        enum:["pending","in-progress","completed"],
        default:"pending"
    },
    dueDate:{
        type:Date,
        required:true,
    },
    assignedTo:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },],

    createdBy: [{
         type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },],
    attachments:[{
        type:String,
    },],

    todoChecklist: [todoSchema],

    progress: {
        type:Number,
        default:0,
    },

}, {timestamps:true},
)
const Task=mongoose.model("Task", taskSchema);
export default Task;
