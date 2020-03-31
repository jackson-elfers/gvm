const User = require("./user.controller");
const Inventory = require("./inventory.controller");
const Files = require("./files.controller");

const services = require("../services");
const check = require("check-types");
const mime = require("mime-types");
const axios = require("axios");

const method = { services: services, check: check, mime: mime, axios: axios };

module.exports.user = new User({ method: method });

module.exports.inventory = new Inventory({ method: method });

module.exports.files = new Files({ method: method });
