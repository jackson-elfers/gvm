module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  async create(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    if (!this.method.mime.lookup(data.file_name)) {
      throw new Error("file_name doesn't have a recognizable mime-type");
    }
    if (this.method.mime.lookup(data.file_name) !== "image/jpeg") {
      throw new Error("file must be of type image/jpeg");
    }
    return await this.method.services.files.create(data);
  }

  async readByOwnerId(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    return await this.method.services.files.readByOwnerId(data);
  }

  async readByStorageName(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    return await this.method.services.files.readByStorageName(data);
  }

  async remove(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.services.files.remove(data);
  }
};
