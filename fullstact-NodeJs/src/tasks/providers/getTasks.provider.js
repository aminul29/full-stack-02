const Task = require("../task.schema.js");

async function getTasksProvider(req, res) {
    // Using MongoDB's find() method to get all tasks
    return await Task.find(); // return all tasks
}

module.exports = getTasksProvider;