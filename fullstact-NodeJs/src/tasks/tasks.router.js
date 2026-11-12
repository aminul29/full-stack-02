const express = require("express");
const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const tasksController = require("./tasks.controller.js");
const createTaskValidator = require("./validators/createTask.validator.js");
const getTasksValidator = require("./validators/getTasks.validator.js");
const deleteTaskValidator = require("./validators/deleteTask.validator.js");
const updateTaskValidator = require("./validators/updateTask.validator.js");

const tasksRouter = express.Router();

// Get all tasks from database
tasksRouter.get("/tasks", getTasksValidator, (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return tasksController.handleGetTasks(req, res);
    }

    return res.status(StatusCodes.BAD_REQUEST).json(result.array());
});

// Create a new task in database
tasksRouter.post("/tasks", createTaskValidator, (req, res) => {
    const result = validationResult(req);
    if(result.isEmpty()){
        return tasksController.handlePostTasks(req, res);
    }else{
       res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
});

tasksRouter.patch('/tasks', updateTaskValidator, (req, res) => {
    const result = validationResult(req);
    if(result.isEmpty()){
        return tasksController.handlePatchTasks(req, res);
    }else{
       res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
});

tasksRouter.delete("/tasks", deleteTaskValidator, (req, res) => {
    const result = validationResult(req);
    if(result.isEmpty()){
        return tasksController.handleDeleteTasks(req, res);
    }else{
       res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
});

module.exports = tasksRouter;