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
      throw new Error("file must by of type image/jpeg");
    }
    if (this.method.mime.lookup(data.file_name) !== "image/png") {
      throw new Error("file must by of type image/png");
    }
    await this.method.services.files.create(data);
  }

  async readByOwnerId(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    return await this.method.services.files.readByOwnerId(data);
  }

  async readByFileName(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    return await this.method.services.files.readByFileName(data);
  }

  async remove(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.services.files.remove(data);
  }
};
