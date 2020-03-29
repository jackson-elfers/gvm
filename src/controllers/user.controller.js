module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  async login(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as second argument");
    return await this.method.services.user.login(data);
  }

  async register(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as second argument");
    return await this.method.services.user.register(data);
  }

  async updateUsername(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as second argument");
    await this.method.services.user.updateUsername(data);
  }

  async updatePassword(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as second argument");
    await this.method.services.user.updatePassword(data);
  }

  async remove(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as second argument");
    await this.method.services.user.remove(data);
  }
};
