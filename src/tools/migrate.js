const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const axios = require("axios");
const actions = require("../controllers");
const db = require("../db");
const request = require("request");

async function media(data) {
  return (await axios.get(`https://www.giocars.com/files/read/owner/${data.parent_id}`)).data.data;
}

async function s3Upload(data) {
  for (var i = 0; i < data.files.length; ++i) {
    // if thumbnail set it
    try {
      const params = {
        body: (
          await axios.get(`https://www.giocars.com/files/read/storage/${data.files[i].storage_name}`, {
            responseType: "stream"
          })
        ).data,
        owner_id: data._id,
        file_name: data.files[i].file_name
      };
      const response = await actions.files.create(params);
      if (data.files[i].storage_name === data.thumbnail) {
        await actions.inventory.updateThumbnail({ _id: data._id, thumbnail: response.info.storage_name });
      }
      console.log(`uploaded ${params.file_name}`);
    } catch (e) {
      console.log(`failed to upload, moving on...`);
      console.log(e.message);
      continue;
    }
  }
}

async function upload(data) {
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
  const response = await axios.get("https://www.giocars.com/inventory/select/null/null/null/null/0/1000");
  console.log(response.data.data);
  console.log(response.data.data.length);
  for (var i = 0; i < response.data.data.length; ++i) {
    console.log(`${i}`);
    await upload(response.data.data[i]);
  }
  console.log("Complete");
}

//migrate().catch(error => {
//console.log(error);
//});
