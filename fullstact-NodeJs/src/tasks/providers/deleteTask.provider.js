const Task = require("../../tasks/task.schema.js");
// import matchedData, StatusCodes, and errorLogger
const { matchedData } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper.js");

async function deleteTaskProvider(req, res) {
    const validatedData = matchedData(req);

    try{
        const deletedTask = await Task.deleteOne({ _id: validatedData._id });
        return res.status(StatusCodes.OK).json(deletedTask);
    } catch (error) {
        errorLogger("Error occurred while deleting task", req, error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ reason: "Unable to process request at the moment, please try again later" });
    }
}

module.exports = deleteTaskProvider;

