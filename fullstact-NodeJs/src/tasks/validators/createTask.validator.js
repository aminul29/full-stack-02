const { body } = require("express-validator");

const createTaskValidator = [
    body("title", "The title cannot be empty").notEmpty(),
    body("title", "The title must be a string").isString(),
    body("title", "The title must be a string").isLength({max: 100}),
    body("title").trim(),
    body("dueDate", "Due date needs to be a valid ISO08601 string").notEmpty().isISO8601(),
    body("description", "The description cannot be empty and must be a string").notEmpty().isString().trim(),
    body("description", "The description cannot be more than 500 characters").isLength({max: 500}),
    body("status", "The status cannot be empty").notEmpty().isIn(["todo", "inProgress", "completed"]),
    body("priority", "The priority cannot be empty").notEmpty().isIn(["low", "normal", "high"]),
]

module.exports = createTaskValidator