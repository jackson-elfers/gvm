const path = require("path");
const fs = require("fs");
const typecast = require("./typecast");
const check = require("check-types");
const mysql = require("mysql");
const models = require("./models");
const user = require("./user");
const inventory = require("./inventory");
const files = require("./files");

var connection = null;

module.exports.connect = function() {
  connection = mysql.createPool({
    connectionLimit: process.env.MYSQL_CONNECTION_LIMIT,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    debug: false,
    ssl:
      process.env.MYSQL_SSL === "true"
        ? { ca: fs.readFileSync(path.join(process.cwd(), "./rds-ca-2019-root.pem")) }
        : null,
    typeCast: typecast
  });
};

module.exports.disconnect = function() {
  connection.end();
};

module.exports.ready = function() {
  return new Promise((resolve, reject) => {
    connection.query("select uuid()", function(error, result, fields) {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

module.exports.query = function(string, info) {
  if (info === undefined) {
    info = null;
  } else {
    check.assert(check.object(info), "optional second argument must be object");
  }
  return new Promise((resolve, reject) => {
    connection.query(string, function(error, results, fields) {
      if (error) {
        reject(error);
      } else {
        resolve({
          results: results,
          fields: fields === undefined ? null : fields,
          info: info
        });
      }
    });
  });
};

module.exports.actions = {
  models: models,
  user: user,
  inventory: inventory,
  files: files
};
