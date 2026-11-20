const {query} = require("express-validator");

const getTasksValidator = [
    query("limit", "Limit must be an integer between 1 and 100")
        .optional()
        .isInt({ min: 1, max: 100 })
        .toInt(),
    query("page", "Page must be a positive integer")
        .optional()
        .isInt({ min: 1 })
        .toInt(),
    query("order", "Order must be one of ['asc', 'desc']").optional().isIn(["asc", "desc"]),
    query("status", "Status must be one of ['todo', 'inProgress', 'completed']")
        .optional()
        .isIn(["todo", "inProgress", "completed"]),
    query("priority", "Priority must be one of ['low', 'normal', 'high']")
        .optional()
        .isIn(["low", "normal", "high"]),
    query("search", "Search must be a string of at most 100 characters")
        .optional()
        .isString()
        .trim()
        .isLength({ max: 100 }),
];

module.exports = getTasksValidator;