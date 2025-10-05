const Task = require("../../tasks/task.schema.js");
const { matchedData } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const logger = require("../../helpers/winston.helper.js");

async function createTaskProvider(req, res){
    // Create a new task
    const validatedResult = matchedData(req);
    const task = new Task(validatedResult);

    try{
        await task.save(); // save task to database
        return res.status(StatusCodes.CREATED).json(task);
    }catch(error){
        console.error(error);
        logger.error(`Error creating a new task: ${error.message}`, {
            metadata: {
                errorCode: error.code,
                errorName: error.name,
                method: req.method,
                url: req.originalUrl,
                body: req.body,
                error: error,
            }
        });
        return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
            reason: "Unable to process your request at the moment, please try again later",
        });
    }
    
}

module.exports = createTaskProvider;