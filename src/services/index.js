const User = require("./user.service");
const Inventory = require("./inventory.service");
const Files = require("./files.service");

const db = require("../db");
const utils = require("../utils");
const config = require("../config");
const check = require("check-types");
const axios = require("axios");
const AWS = require("aws-sdk");
const mime = require("mime-types");

const method = { db: db, check: check, utils: utils, config: config, axios: axios, AWS: AWS, mime: mime };

module.exports.user = new User({ method: method });

module.exports.inventory = new Inventory({ method: method });

module.exports.files = new Files({ method: method });
