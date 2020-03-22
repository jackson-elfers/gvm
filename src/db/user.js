const db = require("./index");
const uuidv1 = require("uuid/v1");
const sqlstring = require("sqlstring");
const check = require("check-types");

// create user
module.exports.create = async function(data) {
  check.assert(check.object(data), "expected object as first argument");
  check.assert(check.string(data.username), "username must be of type string");
  check.assert(check.string(data.password), "password must be of type string");
  const query = `
insert into user
values(
uuid_to_bin(?),
current_timestamp(),
current_timestamp(),
?,
?
);
`;
  const _id = uuidv1();
  const params = [_id, data.username, data.password];
  return await db.query(sqlstring.format(query, params), { _id: _id });
};

// read single user by username
module.exports.readSingle = async function(data) {
  check.assert(check.object(data), "expected object as first argument");
  check.assert(check.string(data.username), "username must be of type string");
  const query = `
select
bin_to_uuid(_id) _id,
created_at,
updated_at,
username,
password
from user
where username = ?;
`;
  const params = [data.username];
  return await db.query(sqlstring.format(query, params));
};

// update username
module.exports.updateUsername = async function(data) {
  check.assert(check.object(data), "expected object as first argument");
  check.assert(check.string(data._id), "_id must be of type string");
  check.assert(check.string(data.username), "username must be of type string");
  const query = `
update user set
updated_at = current_timestamp(),
username = ?
where _id = uuid_to_bin(?);
`;
  const params = [data.username, data._id];
  return await db.query(sqlstring.format(query, params));
};

// update password
module.exports.updatePassword = async function(data) {
  check.assert(check.object(data), "expected object as first argument");
  check.assert(check.string(data._id), "_id must be of type string");
  check.assert(check.string(data.password), "password must be of type string");
  const query = `
update user set
updated_at = current_timestamp(),
password = ?
where _id = uuid_to_bin(?);
`;
  const params = [data.password, data._id];
  return await db.query(sqlstring.format(query, params));
};

// delete user
module.exports.delete = async function(data) {
  check.assert(check.object(data), "expected object as first argument");
  check.assert(check.string(data._id), "_id must be of type string");
  const query = `
delete from user where _id = uuid_to_bin(?)
`;
  const params = [data._id];
  return await db.query(sqlstring.format(query, params));
};
