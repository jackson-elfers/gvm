const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const axios = require("axios");
const actions = require("../controllers");
const db = require("../db");

async function files(data) {
  return await axios.get(`https://www.giocars.com/files/inventory/${data.parent_id}`);
}

async function upload(data) {
  //const response = await files({ parent_id: data._id });
  await actions.inventory.create(data);
  // create inventory entry
  // upload media to s3
}

async function migrate() {
  // connect database
  db.connect();
  // test database connection
  await db.ready();
  // seed database models
  await db.actions.models();
  console.log("database: connected");
  const response = await axios.get("https://www.giocars.com/inventory/search/all/all/all/all/0");
  for (var i = 0; i < 1; ++i) {
    // await upload(response.data.body[i]);
  }
}

migrate().catch(error => {
  console.log(error);
});
