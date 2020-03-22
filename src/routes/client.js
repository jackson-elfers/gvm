const path = require("path");

module.exports.home = function(req, res) {
  res.sendFile(path.join(process.cwd(), "./client/build/index.html"));
};
