const db = require("./index");
const uuidv1 = require("uuid/v1");
const sqlstring = require("sqlstring");
const check = require("check-types");
const mime = require("mime-types");

module.exports.create = async function(data) {
  check.assert(check.object(data), "expected object as first argument");
  check.assert(check.string(data.owner_id), "owner_id must be of type string");
  check.assert(check.string(data.file_name), "file_name must be of type string");
  if (!mime.lookup(data.file_name)) {
    throw new Error("file_name doesn't have a recognizable mime-type");
  }
  const query = `
insert into files
values(
uuid_to_bin(?),
uuid_to_bin(?),
current_timestamp(),
current_timestamp(),
?,
?,
?
);
`;
  const _id = uuidv1();
  const content_type = mime.lookup(data.file_name);
  const storage_name = `${_id}.${mime.extension(content_type)}`;
  const params = [_id, data.owner_id, content_type, data.file_name, storage_name];
  return await db.query(sqlstring.format(query, params), { storage_name: storage_name, content_type: content_type });
};

module.exports.readByOwnerId = async function(data) {
  check.assert(check.object(data), "expected object as first argument");
  check.assert(check.string(data.owner_id), "owner_id must be of type string");
  const query = `
select *
from files
where owner_id = ?;
`;
  const params = [data.url_title];
  return await db.query(sqlstring.format(query, params));
};

module.exports.remove = async function(data) {
  check.assert(check.object(data), "expected object as first argument");
  check.assert(check.string(data._id), "_id must be of type string");
  const query = `
delete from files where _id = uuid_to_bin(?)
`;
  const params = [data._id];
  return await db.query(sqlstring.format(query, params));
};
