const express = require("express");
const tasksController = require("./tasks.controller.js");
const tasksRouter = express.Router();

// Get all tasks from database
tasksRouter.get("/tasks", tasksController.handleGetTasks);

// Create a new task in database
tasksRouter.post("/tasks", tasksController.handlePostTasks);

tasksRouter.patch("/tasks", tasksController.handlePatchTasks);

tasksRouter.delete("/tasks", tasksController.handleDeleteTasks);

module.exports = tasksRouter;