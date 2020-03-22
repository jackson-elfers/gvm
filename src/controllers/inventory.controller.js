export default class Main {
  constructor(props) {
    this.method = props.method;
  }

  async create(data) {
    check.assert(check.object(data), "expected object as first argument");
    await this.method.services.inventory.create(data);
  }

  async readItemType(data) {
    check.assert(check.object(data), "expected object as first argument");
    return await this.method.services.inventory.readItemType(data);
  }

  async readYear(data) {
    check.assert(check.object(data), "expected object as first argument");
    return await this.method.services.inventory.readYear(data);
  }

  async readMake(data) {
    check.assert(check.object(data), "expected object as first argument");
    return await this.method.services.inventory.readMake(data);
  }

  async readModel(data) {
    check.assert(check.object(data), "expected object as first argument");
    return await this.method.services.inventory.readModel(data);
  }

  async readSelect(data) {
    check.assert(check.object(data), "expected object as first argument");
    await this.method.services.inventory.readSelect(data);
  }

  async readSingle(data) {
    check.assert(check.object(data), "expected object as first argument");
    await this.method.services.inventory.readSingle(data);
  }

  async update(data) {
    check.assert(check.object(data), "expected object as first argument");
    await this.method.services.inventory.update(data);
  }

  async updateThumbnail(data) {
    check.assert(check.object(data), "expected object as first argument");
    await this.method.services.inventory.updateThumbnail(data);
  }

  async remove(data) {
    check.assert(check.object(data), "expected object as first argument");
    await this.method.services.inventory.remove(data);
  }
}
