const Task = require("../../tasks/task.schema.js");
const { matchedData } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper.js");

async function createTaskProvider(req, res) {
  // Create a new task
  const validatedResult = matchedData(req);
  const task = new Task(validatedResult);

  try {
    await task.save(); // save task to database
    return res.status(StatusCodes.CREATED).json(task);
  } catch (error) {
    errorLogger(`Error creating a new task: ${error.message}`, req, error);

    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason:
        "Unable to process your request at the moment, please try again later",
    });
  }
}

module.exports = createTaskProvider;
