const db = require("./index");

// user
const user = async function() {
  const query = `
create table if not exists user(
_id binary(16) not null unique,
created_at datetime not null,
updated_at datetime not null,
username varchar(255) not null unique,
password varchar(255) not null,
primary key (_id)
);
`;
  await db.query(query);
};

// inventory
const inventory = async function() {
  const query = `
create table if not exists inventory(
_id binary(16) not null,
created_at datetime not null,
updated_at datetime not null,
thumbnail text not null,
item_type varchar(255) not null,
year int not null,
make varchar(255) not null,
model varchar(255) not null,
title varchar(255) not null,
url_title varchar(255) not null,
sold bit not null,
stock varchar(255) not null,
vin varchar(255) not null,
mileage int not null,
price decimal(15,2) not null,
description text not null,
color text not null,
engine text not null,
transmission text not null,
options text not null,
item_condition text not null,
primary key (_id)
);
`;
  await db.query(query);
};

// file
const file = async function() {
  const query = `
create table if not exists files(
_id binary(16) not null,
owner_id binary(16) not null,
created_at datetime not null,
updated_at datetime not null,
content_type varchar(255) not null,
file_name varchar(255) not null,
primary key (_id)
);
`;
  await db.query(query);
};

module.exports = async function() {
  await user();
  await inventory();
  await file();
};
