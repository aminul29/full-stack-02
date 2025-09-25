const Task = require("../../tasks/task.schema.js");

async function deleteTaskProvider(req, res) {
    // MongoDB provides deleteOne() for single document deletion
    // deleteMany() is also available for multiple documents
    return await Task.deleteOne({ _id: req.body["_id"] });
}

module.exports = deleteTaskProvider;

