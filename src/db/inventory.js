const db = require("./index");
const uuidv1 = require("uuid/v1");
const sqlstring = require("sqlstring");
const check = require("check-types");
const shortid = require("shortid");
const urlify = require("urlify").create({
  addEToUmlauts: true,
  szToSs: true,
  spaces: "-",
  nonPrintable: "-",
  trim: true
});

const columns = `
bin_to_uuid(_id) _id,
created_at,
updated_at,
thumbnail,
item_type,
year,
make,
model,
title,
url_title,
sold,
stock,
vin,
mileage,
price,
description,
color,
engine,
transmission,
options,
item_condition
`;

module.exports.create = async function(data) {
  check.assert(check.object(data), "expected object as first argument");
  check.assert(check.string(data.thumbnail), "thumbnail must be of type string");
  check.assert(check.string(data.item_type), "item_type must be of type string");
  check.assert(check.number(data.year), "year must be of type number");
  check.assert(check.string(data.make), "make must be of type string");
  check.assert(check.string(data.model), "model must be of type string");
  check.assert(check.string(data.title), "title must be of type string");
  check.assert(check.boolean(data.sold), "sold must be of type boolean");
  check.assert(check.string(data.stock), "stock must be of type string");
  check.assert(check.string(data.vin), "vin must be of type string");
  check.assert(check.number(data.mileage), "mileage must be of type number");
  check.assert(check.number(data.price), "price must be of type number");
  check.assert(check.string(data.description), "description must be of type string");
  check.assert(check.string(data.color), "color must be of type string");
  check.assert(check.string(data.engine), "engine must be of type string");
  check.assert(check.string(data.transmission), "transmission must be of type string");
  check.assert(check.string(data.options), "options must be of type string");
  check.assert(check.string(data.item_condition), "item_condition must be of type string");
  const query = `
insert into inventory
values(
uuid_to_bin(?),
current_timestamp(),
current_timestamp(),
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?
);
`;
  const _id = uuidv1();
  const short_title = data.title
    .split(" ")
    .slice(0, 12)
    .join(" ");
  const url_title = `${shortid.generate()}-${urlify(short_title)}`;
  const params = [
    _id,
    data.thumbnail,
    data.item_type,
    data.year,
    data.make,
    data.model,
    data.title,
    url_title,
    data.sold,
    data.stock,
    data.vin,
    data.mileage,
    data.price,
    data.description,
    data.color,
    data.engine,
    data.transmission,
    data.options,
    data.item_condition
  ];
  return await db.query(sqlstring.format(query, params), { _id: _id, url_title: url_title });
};

module.exports.readItemType = async function() {
  const query = `
select distinct item_type as selection
from inventory
order by item_type desc;
`;
  return await db.query(query);
};

module.exports.readYear = async function() {
  const query = `
select distinct year as selection
from inventory
order by year desc;
`;
  return await db.query(query);
};

module.exports.readMake = async function() {
  const query = `
select distinct make as selection
from inventory
order by make desc;
`;
  return await db.query(query);
};

module.exports.readModel = async function() {
  const query = `
select distinct model as selection
from inventory
order by model desc;
`;
  return await db.query(query);
};

module.exports.readSelect = async function(data) {
  check.assert(check.object(data), "expected object as first argument");
  check.assert(check.string(data.item_type), "item_type must be of type string");
  check.assert(data.year === "null" ? true : check.number(data.year), "year must be of type number");
  check.assert(check.string(data.make), "make must be of type string");
  check.assert(check.string(data.model), "model must be of type string");
  check.assert(check.number(data.index), "index must be of type number");
  check.assert(check.number(data.offset), "offset must be of type number");
  var where = data.item_type !== "null" ? `item_type = ? and ` : `item_type = item_type and `;
  where += data.year !== "null" ? `year = ${sqlstring.escape(data.year)} and ` : `year = year and `;
  where += data.make !== "null" ? `make = ${sqlstring.escape(data.make)} and ` : `make = make and `;
  where += data.model !== "null" ? `model = ${sqlstring.escape(data.model)}` : `model = model`;
  const query = `
select
${columns}
from inventory
where ${where}
order by price desc limit ${sqlstring.escape(data.index) * sqlstring.escape(data.offset)}, ${sqlstring.escape(
    data.offset
  )};
`;
  return await db.query(query);
};

module.exports.readSingleByUrlTitle = async function(data) {
  check.assert(check.object(data), "expected object as first argument");
  check.assert(check.string(data.url_title), "url_title must be of type string");
  const query = `
select
${columns}
from inventory
where url_title = ?;
`;
  const params = [data.url_title];
  return await db.query(sqlstring.format(query, params));
};

module.exports.readSingleById = async function(data) {
  check.assert(check.object(data), "expected object as first argument");
  check.assert(check.string(data._id), "_id must be of type string");
  const query = `
select
${columns}
from inventory
where _id = uuid_to_bin(?);
`;
  const params = [data._id];
  return await db.query(sqlstring.format(query, params));
};

module.exports.update = async function(data) {
  check.assert(check.object(data), "expected object as first argument");
  check.assert(check.string(data.item_type), "item_type must be of type string");
  check.assert(check.number(data.year), "year must be of type number");
  check.assert(check.string(data.make), "make must be of type string");
  check.assert(check.string(data.model), "model must be of type string");
  check.assert(check.string(data.title), "title must be of type string");
  check.assert(check.boolean(data.sold), "sold must be of type boolean");
  check.assert(check.string(data.stock), "stock must be of type string");
  check.assert(check.string(data.vin), "vin must be of type string");
  check.assert(check.number(data.price), "price must be of type number");
  check.assert(check.string(data.description), "description must be of type string");
  check.assert(check.string(data.color), "color must be of type string");
  check.assert(check.string(data.engine), "engine must be of type string");
  check.assert(check.string(data.transmission), "transmission must be of type string");
  check.assert(check.string(data.options), "options must be of type string");
  check.assert(check.string(data.item_condition), "item_condition must be of type string");
  const query = `
update inventory set
updated_at = current_timestamp(),
item_type = ?,
year = ?,
make = ?,
model = ?,
title = ?,
url_title = ?,
sold = ?,
stock = ?,
vin = ?,
mileage = ?,
price = ?,
description = ?,
color = ?,
engine = ?,
transmission = ?,
options = ?,
item_condition = ?
where _id = uuid_to_bin(?);
`;
  const url_title = `${shortid.generate()}-${urlify(data.title)}`;
  const params = [
    data.item_type,
    data.year,
    data.make,
    data.model,
    data.title,
    url_title,
    data.sold,
    data.stock,
    data.vin,
    data.mileage,
    data.price,
    data.description,
    data.color,
    data.engine,
    data.transmission,
    data.options,
    data.item_condition,
    data._id
  ];
  return await db.query(sqlstring.format(query, params), { url_title: url_title });
};

module.exports.updateThumbnail = async function(data) {
  check.assert(check.object(data), "expected object as first argument");
  check.assert(check.string(data._id), "_id must be of type string");
  check.assert(check.string(data.thumbnail), "thumbnail must be of type string");
  const query = `
update inventory set
updated_at = current_timestamp(),
thumbnail = ?
where _id = uuid_to_bin(?);
`;
  const params = [data.thumbnail, data._id];
  return await db.query(sqlstring.format(query, params));
};

module.exports.remove = async function(data) {
  check.assert(check.object(data), "expected object as first argument");
  check.assert(check.string(data._id), "_id must be of type string");
  const query = `
delete from inventory where _id = uuid_to_bin(?)
`;
  const params = [data._id];
  return await db.query(sqlstring.format(query, params));
};
