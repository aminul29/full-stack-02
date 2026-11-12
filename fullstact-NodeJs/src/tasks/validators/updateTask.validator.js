// import body from express-validator
const { body } = require("express-validator");

const updateTaskValidator = [
    body("_id", "valid document ID is required").notEmpty().isMongoId(),
    body("title", "title must be a string").optional().isString(),
    body("description", "description must be a string").optional().isString(),
    // title length to 100 characters
    body("title", "title must be less than 100 characters").optional().isLength({ max: 100 }),
    // duedate, priority, status are optional and must be valid
    body("dueDate", "dueDate must be a valid date").optional().isISO8601(),
    body("priority", "priority must be a valid enum value").optional().isIn(["low", "normal", "high"]),
    body("status", "status must be a valid enum value").optional().isIn(["todo", "inProgress", "completed"]),
];

// export the validator
module.exports = updateTaskValidator;
