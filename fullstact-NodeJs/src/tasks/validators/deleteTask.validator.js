// import body from express-validator
const { body } = require("express-validator");

const deleteTaskValidator = [
    body("_id", "valid document ID is required").notEmpty().isMongoId(),
];

// export the validator
module.exports = deleteTaskValidator;
