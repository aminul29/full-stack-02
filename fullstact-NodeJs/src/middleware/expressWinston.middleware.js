
    // Import express-winston for HTTP request logging
    const expressWinston = require("express-winston");
    // Import our custom winston logger instance
    const logger = require("../helpers/winston.helper.js");

    // Create express-winston logger middleware
    const expressWinstonLogger = expressWinston.logger({
        // Use our custom winston logger instance
        winstonInstance: logger,
        // Include metadata in logs (request/response details)
        meta: true,
        // Define the log message format
        // {{variables}} will be replaced with actual values
        msg: "HTTP {{req.method}} {{req.url}} responded with {{res.statusCode}} in {{res.responseTime}}ms",
        // Use express default format for request logging
        expressFormat: true,
        // Enable colorization of log output in console
        colorize: true,    
    });

    // Export the middleware for use in the application
    module.exports = expressWinstonLogger;