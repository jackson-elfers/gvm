const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");
const fs = require("fs");
const path = require("path");
const uuid = require("uuidv1");
const check = require("check-types");

async function compress(data) {
  check.assert(check.object(data), "expected object as first argument");
  check.assert(check.string(data.src), "src must be of type string");
  check.assert(check.string(data.dest), "dest must be of type string");
  const params = {
    destination: data.dest,
    plugins: [imageminJpegtran(), imageminPngquant({ quality: [0.6, 0.8] })]
  };
  return (await imagemin([path.join(data.src, "*.{jpg, png}")], params))[0];
}

function promisePipe(input, output) {
  check.assert(check.object(input), "first argument must be of type object");
  check.assert(check.object(output), "second argument must be of type object");
  return new Promise((resolve, reject) => {
    input
      .pipe(output)
      .on("finish", () => {
        resolve();
      })
      .on("error", error => {
        reject(error);
      });
  });
}

function promiseUnlink(data) {
  check.assert(check.object(data), "expected object as first argument");
  check.assert(check.string(data.path), "path must be of type string");
  return new Promise((resolve, reject) => {
    fs.unlink(data.path, error => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });
}

module.exports = async function(data) {
  check.assert(check.object(data), "expected object as first argument");
  check.assert(check.object(data.input), "input must be of type object");
  check.assert(check.string(data.content_type), "content_type must be of type string");
  if (!mime.lookup(data.content_type)) {
    throw new Error("content_type must be of valid type");
  }
  const filename = `${uuid()}.${mime.extension(data.content_type)}`;
  await promisePipe(data.input, fs.createWriteStream(path.join(__dirname, `./images/input/${filename}`)));
  const file = await compress({
    src: path.join(__dirname, `./images/input`),
    dest: path.join(__dirname, `./images/output`)
  });
  await promiseUnlink({ path: path.join(__dirname, `./images/input/${filename}`) });
  await promiseUnlink({ path: path.join(__dirname, `./images/output/${filename}`) });
  return file;
};
