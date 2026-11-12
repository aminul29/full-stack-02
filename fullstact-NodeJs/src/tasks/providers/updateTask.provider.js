const Task = require("../task.schema.js"); // import the model
// import matchedData, StatusCodes, and errorLogger
const { matchedData } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper.js");

async function updateTaskProvider(req, res) {
    const validatedData = matchedData(req); // get validated data from request
    try{
        // fetch id
        const task = await Task.findById(validatedData._id);
        if (!task) {
            return res.status(StatusCodes.NOT_FOUND).json({ reason: "Task not found" });
        }
        // update task
        task.title = validatedData.title || task.title;
        task.description = validatedData.description || task.description;
        task.status = validatedData.status || task.status;
        task.priority = validatedData.priority || task.priority;
        task.dueDate = validatedData.dueDate || task.dueDate;
        // save updated task to database
        await task.save();
        // success response
        return res.status(StatusCodes.OK).json(task);
    } catch (error) {
        errorLogger("Error occurred while updating task", req, error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ reason: "Unable to process request at the moment, please try again later" });
    }

}

module.exports = updateTaskProvider;
