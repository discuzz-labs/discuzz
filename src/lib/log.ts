const logger = require("log-to-file");

var lOGS_DIR = "logs/";
const log = (place: "actions" | "api" | "services" | "database", err: any, message: string) => {
  logger(`${message} - ${err}`, `logs/${place}.log`);
};

export default log;
