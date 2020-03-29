module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  async create(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    return await this.method.services.inventory.create(data);
  }

  async readItemType(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    return await this.method.services.inventory.readItemType(data);
  }

  async readYear(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    return await this.method.services.inventory.readYear(data);
  }

  async readMake(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    return await this.method.services.inventory.readMake(data);
  }

  async readModel(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    return await this.method.services.inventory.readModel(data);
  }

  async readSelect(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    return await this.method.services.inventory.readSelect(data);
  }

  async readSingleByUrlTitle(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    return await this.method.services.inventory.readSingleByUrlTitle(data);
  }

  async readSingleById(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    return await this.method.services.inventory.readSingleById(data);
  }

  async update(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    return await this.method.services.inventory.update(data);
  }

  async updateThumbnail(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    return await this.method.services.inventory.updateThumbnail(data);
  }

  async remove(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    return await this.method.services.inventory.remove(data);
  }
};
