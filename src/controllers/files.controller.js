module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  async create(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
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
