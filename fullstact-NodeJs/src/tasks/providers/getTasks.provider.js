const Task = require("../task.schema.js");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper.js");

async function getTasksProvider(req, res) {
    // find all tasks asynchronously and return them
    try {
        const tasks = await Task.find();
        return res.status(StatusCodes.OK).json(tasks);
    } catch (error) {
        errorLogger("Error occurred while fetching tasks", req, error);
        return res.status(StatusCodes.GATEWAY_TIMEOUT).json({ reason: "Unable to process request at the moment, please try again later" });
    }
}

module.exports = getTasksProvider;
