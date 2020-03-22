const bcrypt = require("bcrypt");
const check = require("check-types");

// create hash of password
module.exports.hash = async function(password) {
  check.assert(check.string(password), "first argument must be of type string");
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function(error, salt) {
      if (error) {
        reject(error);
      }
      bcrypt.hash(password, salt, function(error, hash) {
        if (error) {
          reject(error);
        }
        resolve(hash);
      });
    });
  });
};

// compare plain text against hash
module.exports.compare = async function(password, hash) {
  check.assert(check.string(password), "first argument must be of type string");
  check.assert(check.string(hash), "second argument must be of type string");
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function(error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
