const db = require("./index");
const uuidv1 = require("uuid/v1");
const sqlstring = require("sqlstring");
const check = require("check-types");

module.exports.create = async function(data) {
  check.assert(check.object(data), "expected object as first argument");
  check.assert(check.string(data.owner_id), "owner_id must be of type string");
  check.assert(check.string(data.content_type), "content_type must be of type string");
  check.assert(check.string(data.file_name), "file_name must be of type string");
  const query = `
insert into files
values(
uuid_to_bin(?),
uuid_to_bin(?),
current_timestamp(),
current_timestamp(),
?,
?
);
`;
  const _id = uuidv1();
  const params = [_id, data.owner_id, data.content_type, data.file_name];
  return await db.query(sqlstring.format(query, params), { _id: _id });
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
