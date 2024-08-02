"use server"


const logger = require("log-to-file");

// Define the logs directory
const LOGS_DIR = "logs/";

// Define the log function with specific types and improved error handling
const log = (place: string, err: Error, message: string): void => {
  // Ensure the error message is properly formatted
  const errorMessage = err instanceof Error ? `${err.name}: ${err.message} #### ${err.stack}` : String(err);
  // Log the message along with the error
  logger(`${message} - ${errorMessage}`, `${LOGS_DIR}${place}.log`);
};

export default log;