module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  s3Upload(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    this.method.check.assert(this.method.check.string(data.Key), "Key must be of type string");
    this.method.check.assert(this.method.check.object(data.body), "body must be of type object");
    return new Promise((resolve, reject) => {
      this.method.AWS.config.update({ region: process.env.AWS_REGION });
      const s3 = new this.method.AWS.S3({
        params: {
          ACL: "public-read",
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: data.Key,
          ContentType: data.ContentType
        }
      });
      s3.upload({ Body: data.body }).send((error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  s3Delete(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    this.method.check.assert(this.method.check.string(data.Key), "Key must be of type string");
    return new Promise((resolve, reject) => {
      const s3 = new this.method.AWS.S3({
        params: {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: data.Key
        }
      });
      s3.deleteObject().send((error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  async create(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    this.method.check.assert(this.method.check.string(data.file_name), "file_name must be of type string");
    this.method.check.assert(this.method.check.object(data.body), "body must be of type object");
    const response = await this.method.db.actions.files.create(data);
    await this.s3Upload({ Key: response.info.storage_name, body: data.body, ContentType: response.info.content_type });
    return response.results.info;
  }

  async readByOwnerId(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    return await this.method.db.actions.files.readByOwnerId(data);
  }

  async readByStorageName(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    this.method.check.assert(this.method.check.string(data.storage_name), "storage_name must be of type string");
    const url = `https://${process.env.AWS_BUCKET_NAME}.s3-${process.env.AWS_REGION}.amazonaws.com/${data.storage_name}`;
    return this.method.request.get(url);
  }

  async remove(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    this.method.check.assert(this.method.check.string(data.storage_name), "storage_name must be of type string");
    await s3Delete({ Key: response.info.storage_name });
    await this.method.db.actions.files.remove(data);
  }
};
