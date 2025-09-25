const express = require("express");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const responseFormatter = require("./middleware/responseFormatter.js");
const { StatusCodes } = require("http-status-codes");
const tasksRouter = require("./tasks/tasks.router.js");
const authRouter = require("./auth/auth.router.js");
const usersRouter = require("./users/users.router.js");
const mongoose = require("mongoose");

const cors = require("cors");

const app = express();
const port = 3001;

// perse request body
app.use(express.json());

/* Cors Configuration for security
const corsOptions = {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
};
*/

app.use(cors()); 

let accessLogStream = fs.createWriteStream(
    path.join(__dirname, "access.log"),
    { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream })); // log every request
app.use(responseFormatter); // format response middleware

const middleware = (req, res, next) => {
    req.info = { appname: "Tasks Manager", author: "Mhd Aminul" };
    next();
}


app.use(middleware);

// define routes
app.use("/", tasksRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);

app.use((req, res) => {
    res.status(StatusCodes.NOT_FOUND).json(null);
});

// Bootstrap the application/start the server by connecting to MongoDB
async function bootstrap() {
    try {
         // Connect to MongoDB
        await mongoose.connect("mongodb+srv://aminul:PSSWsXy9tAEr0So2@nodejs.asywe1b.mongodb.net/", {dbName: "fullstackTasks"});
        console.log("Connected to MongoDB");

        // Ensures the app starts only after MongoDB is connected
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit with error code
    }
}
// Start the application
bootstrap();


