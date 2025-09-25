const Task = require("../task.schema.js"); // import the model


async function updateTaskProvider(req, res) {
    // fetch id
    const task = await Task.findById(req.body["_id"]);
    // update task
    task.title = req.body.title;
    task.description = req.body.description;
    task.status = req.body.status;
    task.priority = req.body.priority;
    task.dueDate = req.body.dueDate;
    // save updated task to database
    return await task.save();
}

module.exports = updateTaskProvider;