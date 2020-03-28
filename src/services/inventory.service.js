module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  async create(data) {
    check.assert(check.object(data), "expected object as first argument");
    return await this.method.db.actions.inventory.create(data);
  }

  async readItemType(data) {
    check.assert(check.object(data), "expected object as first argument");
    return await this.method.db.actions.inventory.readItemType(data);
  }

  async readYear(data) {
    check.assert(check.object(data), "expected object as first argument");
    return await this.method.db.actions.inventory.readYear(data);
  }

  async readMake(data) {
    check.assert(check.object(data), "expected object as first argument");
    return await this.method.db.actions.inventory.readMake(data);
  }

  async readModel(data) {
    check.assert(check.object(data), "expected object as first argument");
    return await this.method.db.actions.inventory.readModel(data);
  }

  async readSelect(data) {
    check.assert(check.object(data), "expected object as first argument");
    return await this.method.db.actions.inventory.readSelect(data);
  }

  async readSingle(data) {
    check.assert(check.object(data), "expected object as first argument");
    return await this.method.db.actions.inventory.readSingle(data);
  }

  async update(data) {
    check.assert(check.object(data), "expected object as first argument");
    return await this.method.db.actions.inventory.update(data);
  }

  async updateThumbnail(data) {
    check.assert(check.object(data), "expected object as first argument");
    return await this.method.db.actions.inventory.updateThumbnail(data);
  }

  async remove(data) {
    check.assert(check.object(data), "expected object as first argument");
    return await this.method.db.actions.inventory.remove(data);
  }
};
