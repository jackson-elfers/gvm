require("dotenv").config();
const express = require("express");
const db = require("./src/db");
const app = express();
const server = require("http").Server(app);

async function main() {
  // connect database
  db.connect();
  // test database connection
  await db.ready();
  // seed database models
  await db.actions.models();
  console.log("database: connected");
  // start server
  server.listen(process.env.PORT, function() {
    require("./src")(app);
    console.log("server: connected");
    console.log("port: " + process.env.PORT);
  });
}

main().catch(error => {
  console.log(error);
});
