// backend/src/utils/logger.js
const fs = require("fs");
const path = require("path");

const LOG_FILE = path.join(__dirname, "../../call_logs.txt");

function logCall(data) {
  const entry = `[${new Date().toISOString()}] ${data}\n`;
  fs.appendFileSync(LOG_FILE, entry, "utf8");
}

module.exports = { logCall };
