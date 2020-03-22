export default class Main {
  constructor(props) {
    this.method = props.method;
  }

  async create(data) {
    check.assert(check.object(data), "expected object as first argument");
    await this.method.services.files.create(data);
  }

  async readByOwnerId(data) {
    check.assert(check.object(data), "expected object as first argument");
    return await this.method.services.files.readByOwnerId(data);
  }

  async readByFileName(data) {
    check.assert(check.object(data), "expected object as first argument");
    return await this.method.services.files.readByFileName(data);
  }

  async remove(data) {
    check.assert(check.object(data), "expected object as first argument");
    await this.method.services.files.remove(data);
  }
}
