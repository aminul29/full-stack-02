
const { StatusCodes } = require("http-status-codes");
const createUserProvider = require("./providers/createUserProvider.js");

function handleCreateUser(req, res) {
    const user = createUserProvider(req, res);
    res.status(StatusCodes.CREATED).json(user);
}

module.exports = {handleCreateUser};