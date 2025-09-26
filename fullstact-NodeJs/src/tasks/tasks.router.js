const express = require("express");
const { body, validationResult } = require("express-validator"); 
const { StatusCodes } = require("http-status-codes");
const tasksController = require("./tasks.controller.js");
const tasksRouter = express.Router();

// Get all tasks from database
tasksRouter.get("/tasks", tasksController.handleGetTasks);

// Create a new task in database
tasksRouter.post("/tasks", [
    body("title", "The title cannot be empty").notEmpty(),
    body("title", "The title must be a string").isString(),
    body("dueDate", "Due date needs to be a valid ISO08601 string").notEmpty().isISO8601(),
], (req, res) => {
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