const imagemin = require("imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");
const fs = require("fs");
const pfs = require("promise-fs");
const path = require("path");
const uuid = require("uuid/v1");
const check = require("check-types");
const mime = require("mime-types");

function clearDir(data) {
  check.assert(check.object(data), "expected object as first argument");
  check.assert(check.string(data.dirpath), "dirpath must be of type string");
  return new Promise((resolve, reject) => {
    fs.readdir(data.dirpath, (error, files) => {
      if (error) {
        reject(error);
      }
      try {
        for (const file of files) {
          fs.unlink(path.join(data.dirpath, file), error => {
            if (error) {
              reject(error);
            }
          });
        }
      } catch (e) {
        reject(e);
      }
      resolve();
    });
  });
}

async function removeFiles(data) {
  try {
    await clearDir({ dirpath: path.join(path.join(__dirname, `./images/input/${data.dir}`)) });
  } catch (e) {}
  try {
    await clearDir({ dirpath: path.join(path.join(__dirname, `./images/output/${data.dir}`)) });
  } catch (e) {}
}

async function removeDir(data) {
  try {
    await pfs.rmdir(path.join(__dirname, `./images/input/${data.dir}`));
  } catch (e) {}
  try {
    await pfs.rmdir(path.join(__dirname, `./images/output/${data.dir}`));
  } catch (e) {}
}

async function clear(data) {
  check.assert(check.object(data), "expected object as first argument");
  check.assert(check.string(data.dir), "dir must be of type string");
  await removeFiles(data);
  await removeDir(data);
}

async function compress(data) {
  check.assert(check.object(data), "expected object as first argument");
  check.assert(check.string(data.src), "src must be of type string");
  check.assert(check.string(data.dest), "dest must be of type string");
  const params = {
    destination: data.dest,
    plugins: [imageminMozjpeg(), imageminPngquant({ quality: [0.6, 0.8] })]
  };
  const compressed = await imagemin([path.join(data.src, "*.{jpeg, jpg, png}")], params);
  if (compressed.length === 0) {
    throw new Error("failed to compress image file");
  }
  return compressed[0];
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

module.exports = async function(data) {
  check.assert(check.object(data), "expected object as first argument");
  check.assert(check.object(data.input), "input must be of type object");
  check.assert(check.string(data.content_type), "content_type must be of type string");
  if (!mime.extension(data.content_type)) {
    throw new Error("content_type is invalid");
  }
  const directory = uuid();
  const filename = `${uuid()}.${mime.extension(data.content_type)}`;
  try {
    await pfs.access(path.join(__dirname, "./images"));
  } catch (e) {
    await pfs.mkdir(path.join(__dirname, "./images"));
    await pfs.mkdir(path.join(__dirname, "./images/input"));
    await pfs.mkdir(path.join(__dirname, "./images/output"));
  }
  await pfs.mkdir(path.join(__dirname, `./images/input/${directory}`));
  await promisePipe(data.input, fs.createWriteStream(path.join(__dirname, `./images/input/${directory}/${filename}`)));
  try {
    const file = await compress({
      src: path.join(__dirname, `./images/input/${directory}`),
      dest: path.join(__dirname, `./images/output/${directory}`)
    });
    await clear({ dir: directory });
    return file.data;
  } catch (e) {
    await clear({ dir: directory });
    throw e;
  }
};
