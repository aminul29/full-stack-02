const Task = require("../../tasks/task.schema.js");

async function createTaskProvider(req, res){
    // Create a new task
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        priority: req.body.priority,
        dueDate: req.body.dueDate
    });

    return await task.save(); // save task to database
}

module.exports = createTaskProvider;