module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  async create(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    return await this.method.db.actions.inventory.create(data);
  }

  async readItemType(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    return await this.method.db.actions.inventory.readItemType(data);
  }

  async readYear(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    return await this.method.db.actions.inventory.readYear(data);
  }

  async readMake(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    return await this.method.db.actions.inventory.readMake(data);
  }

  async readModel(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    return await this.method.db.actions.inventory.readModel(data);
  }

  async readSelect(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    return await this.method.db.actions.inventory.readSelect(data);
  }

  async readSingle(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    return await this.method.db.actions.inventory.readSingle(data);
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
