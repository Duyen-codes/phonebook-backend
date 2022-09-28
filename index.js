const config = require("./utils/config");
const logger = require("./utils/logger");
const app = require("./app");
const http = require("http");

// initialize the express app
const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`server running on port ${config.PORT}`);
});
