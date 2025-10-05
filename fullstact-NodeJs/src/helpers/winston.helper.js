// Import required dependencies
    const winston = require("winston");
    const path = require("path");

    // Configure different transport methods for logging
    const transports = [
        // Console transport for development logging
        new winston.transports.Console({
            level: "info", // Log only info and above levels
            format: winston.format.combine(
                winston.format.colorize(), // Add colors to console output
                /* winston.format.simple() */
            ),
        }),
        // File transport for info level logs
        new winston.transports.File({
            level: "info",
            filename: path.join(__dirname, "../..", "info.log"), // Store info logs in project root
            format: winston.format.json() // Store logs in JSON format
        }),
        // File transport for error level logs
        new winston.transports.File({
            level: "error",
            filename: path.join(__dirname, "../..", "error.log"), // Store error logs in project root
            format: winston.format.json() // Store logs in JSON format
        })
    ]; 

    // Create and configure the logger instance
    const logger = winston.createLogger({
        // Define the format for log entries
        format: winston.format.combine(
            winston.format.timestamp({
                format: "YYYY-MM-DD HH:mm:ss", // Add timestamp to each log
            }),
            winston.format.printf(
                // Custom format: timestamp [level]: message
                (info) => `${info.timestamp} [${info.level}]: ${info.message}`
            )
        ),
        transports: transports, // Apply the transport configurations
    });

    // Export the logger for use in other files
    module.exports = logger;