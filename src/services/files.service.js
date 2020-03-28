module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  s3Upload(data) {
    check.assert(check.object(data), "expected object as first argument");
    check.assert(check.string(data.Key), "Key must be of type string");
    check.assert(check.stream(data.body), "body must be of type stream");
    return new Promise((resolve, reject) => {
      var s3obj = new this.method.AWS.S3({ params: { Bucket: process.env.AWS_S3_BUCKET, Key: data.Key } });
      s3obj.upload({ Body: data.body }).send((error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  async create(data) {
    check.assert(check.object(data), "expected object as first argument");
    check.assert(check.string(data.file_name), "file_name must be of type string");
    check.assert(check.stream(data.body), "body must be of type stream");
    await this.method.db.actions.files.create(data);
    await this.s3Upload({ Key: data.file_name, body: data.body });
  }

  async readByOwnerId(data) {
    check.assert(check.object(data), "expected object as first argument");
    return await this.method.db.actions.files.readByOwnerId(data);
  }

  async readByFileName(data) {
    check.assert(check.object(data), "expected object as first argument");
    check.assert(check.string(data.file_name), "file_name must be of type string");
    return await this.method.axios.get(`${process.env.AWS_S3_BUCKET}${data.file_name}`);
  }

  async remove(data) {
    check.assert(check.object(data), "expected object as first argument");
    await this.method.db.actions.files.remove(data);
  }
};
