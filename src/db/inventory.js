const db = require("./index");
const uuidv1 = require("uuid/v1");
const sqlstring = require("sqlstring");
const check = require("check-types");
const urlify = require("urlify").create({
  addEToUmlauts: true,
  szToSs: true,
  spaces: "_",
  nonPrintable: "_",
  trim: true
});

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
  const url_title = urlify(data.title);
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

module.exports.readItemType = async function(data) {
  check.assert(check.object(data), "expected object as first argument");
  check.assert(check.string(data.item_type), "item_type must be of type string");
  const query = `
select distinct *
from inventory
where item_type = ?
order by item_type desc;
`;
  const params = [data.item_type];
  return await db.query(sqlstring.format(query, params));
};

module.exports.readYear = async function(data) {
  check.assert(check.object(data), "expected object as first argument");
  check.assert(check.number(data.year), "year must be of type string");
  const query = `
select distinct *
from inventory
where year = ?
order by year desc;
`;
  const params = [data.year];
  return await db.query(sqlstring.format(query, params));
};

module.exports.readMake = async function(data) {
  check.assert(check.object(data), "expected object as first argument");
  check.assert(check.string(data.make), "year must be of type string");
  const query = `
select distinct *
from inventory
where make = ?
order by make desc;
`;
  const params = [data.make];
  return await db.query(sqlstring.format(query, params));
};

module.exports.readModel = async function(data) {
  check.assert(check.object(data), "expected object as first argument");
  check.assert(check.string(data.make), "year must be of type string");
  const query = `
select distinct *
from inventory
where model = ?
order by model desc;
`;
  const params = [data.model];
  return await db.query(sqlstring.format(query, params));
};

module.exports.readSelect = async function(data) {
  check.assert(check.object(data), "expected object as first argument");
  check.assert(check.string(data.item_type), "item_type must be of type string");
  check.assert(check.number(data.year), "year must be of type number");
  check.assert(check.string(data.make), "make must be of type string");
  check.assert(check.string(data.model), "model must be of type string");
  var where = data.item_type !== "" ? ` ${data.item_type} and ` : ``;
  where += data.year !== "" ? ` ${data.year} and ` : ``;
  where += data.make !== "" ? ` ${data.make} and ` : ``;
  where += data.model !== "" ? ` ${data.model}` : ``;
  const query = `
select *
from inventory
where ${where}
`;
  const params = [data.item_type, data.year, data.make, data.model];
  return await db.query(sqlstring.format(query, params));
};

module.exports.readSingle = async function(data) {
  check.assert(check.object(data), "expected object as first argument");
  check.assert(check.string(data.url_title), "url_title must be of type string");
  const query = `
select *
from inventory
where url_title = ?
`;
  const params = [data.url_title];
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
  const params = [
    data.item_type,
    data.year,
    data.make,
    data.model,
    data.title,
    urlify(data.title),
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
  return await db.query(sqlstring.format(query, params));
};

module.exports.updateThumbnail = async function(data) {
  check.assert(check.object(data), "expected object as first argument");
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
