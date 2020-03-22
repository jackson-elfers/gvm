const check = require("check-types");

module.exports.MockRoute = function() {
  // public

  // private

  // privileged
  this.req = {};
  this.res = {};
  this.next = null;

  this.addReq = function(key, value) {
    check.assert(check.string(key), "first argument must be of type string");
    this.req[key] = value;
  };

  this.addRes = function(key, value) {
    check.assert(check.string(key), "first argument must be of type string");
    this.res[key] = value;
  };

  this.setNext = function(data) {
    this.next = data;
  };
};
