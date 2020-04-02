const db = require("./index");
const uuidv1 = require("uuid/v1");
const sqlstring = require("sqlstring");
const check = require("check-types");
const mime = require("mime-types");

const columns = `
bin_to_uuid(_id) _id,
bin_to_uuid(owner_id) owner_id,
created_at,
updated_at,
content_type,
file_name,
storage_name
`;

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
select
${columns}
from files
where owner_id = uuid_to_bin(?);
`;
  const params = [data.owner_id];
  return await db.query(sqlstring.format(query, params));
};

module.exports.remove = async function(data) {
  check.assert(check.object(data), "expected object as first argument");
  check.assert(check.string(data.storage_name), "storage_name must be of type string");
  const query = `
delete from files where storage_name = ?;
`;
  const params = [data.storage_name];
  return await db.query(sqlstring.format(query, params));
};
