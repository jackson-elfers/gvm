const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const axios = require("axios");
const actions = require("../controllers");
const db = require("../db");
const request = require("request");

async function media(data) {
  return (await axios.get(`https://www.giocars.com/files/inventory/index/${data.parent_id}/all`)).data.body;
}

async function s3Upload(data) {
  for (var i = 0; i < data.files.length; ++i) {
    // if thumbnail set it
    const params = {
      body: request.get(`https://www.giocars.com/aws/file/${data.files[i].file_name}`),
      owner_id: data._id,
      file_name: data.files[i].file_name
    };
    const response = await actions.files.create(params);
    if (data.files[i].file_name === data.thumbnail) {
      await actions.inventory.updateThumbnail({ _id: data._id, thumbnail: response.info.storage_name });
    }
    console.log(`uploaded ${params.file_name}`);
  }
}

async function upload(data) {
  data.sold = data.sold === 0 ? false : true;
  // create inventory entry
  const response = await actions.inventory.create(data);
  // upload media to s3
  response.info.thumbnail = data.thumbnail;
  response.info.files = await media({ parent_id: data._id });
  await s3Upload(response.info);
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
  for (var i = 0; i < response.data.body.length; ++i) {
    console.log(`${i}`);
    await upload(response.data.body[i]);
  }
  console.log("Complete");
}

migrate().catch(error => {
  console.log(error);
});
