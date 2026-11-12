const {query} = require("express-validator");

const getTasksValidator = [
    query("limit", "Limit must be a valid int").optional().isInt().toInt(),
    query("page", "Page must be a valid int").optional().isInt().toInt(),
    query("order", "Order must be one of ['asc', 'desc']").optional().isIn(["asc", "desc"]),
];

module.exports = getTasksValidator;