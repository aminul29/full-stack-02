const express = require("express");
const { body, validationResult } = require("express-validator"); 
const { StatusCodes } = require("http-status-codes");
const tasksController = require("./tasks.controller.js");
const createTaskValidator = require("./validators/createTask.validator.js");

const tasksRouter = express.Router();

// Get all tasks from database
tasksRouter.get("/tasks", tasksController.handleGetTasks);

// Create a new task in database
tasksRouter.post("/tasks", createTaskValidator, (req, res) => {
    const result = validationResult(req);
    if(result.isEmpty()){
        return tasksController.handlePostTasks(req, res);
    }else{
       res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
});

tasksRouter.patch("/tasks", tasksController.handlePatchTasks);

tasksRouter.delete("/tasks", tasksController.handleDeleteTasks);

module.exports = tasksRouter;