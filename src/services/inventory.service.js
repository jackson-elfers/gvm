module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  async create(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    return await this.method.db.actions.inventory.create(data);
  }

  async readItemType() {
    return await this.method.db.actions.inventory.readItemType();
  }

  async readYear() {
    return await this.method.db.actions.inventory.readYear();
  }

  async readMake() {
    return await this.method.db.actions.inventory.readMake();
  }

  async readModel() {
    return await this.method.db.actions.inventory.readModel();
  }

  async readSelect(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    return await this.method.db.actions.inventory.readSelect(data);
  }

  async readSingleByUrlTitle(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    return await this.method.db.actions.inventory.readSingleByUrlTitle(data);
  }

  async readSingleById(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    return await this.method.db.actions.inventory.readSingleById(data);
  }

  async update(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    return await this.method.db.actions.inventory.update(data);
  }

  async updateThumbnail(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    return await this.method.db.actions.inventory.updateThumbnail(data);
  }

  async remove(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    return await this.method.db.actions.inventory.remove(data);
  }
};
