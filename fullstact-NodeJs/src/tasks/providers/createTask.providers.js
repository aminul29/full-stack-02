const Task = require("../../tasks/task.schema.js");
const { matchedData } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

async function createTaskProvider(req, res){
    // Create a new task
    const validatedResult = matchedData(req);
    const task = new Task(validatedResult);

    try{
        await task.save(); // save task to database
        return res.status(StatusCodes.CREATED).json(task);
    }catch(err){
        console.error(err);
        return res.status(StatusCodes.GATWAY_TIMEOUT).json({
            reason: "Unable to process your request at the moment, please try again later",
        });
    }
    
}

module.exports = createTaskProvider;