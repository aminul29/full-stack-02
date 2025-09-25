const {Schema, model} = require("mongoose");

const taskSchema = new Schema({
    title: {
        type: String,
        required: [true, "Task Title is required"],
        trim: true,
        maxlength: [100, "Task title cannot be more than 100 characters"]
    },
    description: {
        type: String,
        required: [true, "Task Description is required"],
        trim: true,
        maxlength: [1000, "Task description cannot be more than 1000 characters"]
    },
    status: {
        type: String,
        required: [true, "Task Status is required"],
        enum: ["todo", "inProgress", "completed"],
        default: "todo"
    },
    priority: {
        type: String,
        required: [true, "Task Priority is required"],
        enum: ["low", "normal", "high"],
        default: "normal"
    },
    dueDate: {
        type: Date,
        required: [true, "Task Due Date is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }    
}, {
    timestamps: true, versionKey: false
});

// create model
const Task = model("Task", taskSchema);
module.exports = Task;

