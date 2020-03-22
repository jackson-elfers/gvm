export default class Main {
  constructor(props) {
    this.method = props.method;
  }

  async Login(data) {
    method.check.assert(method.check.object(method), "expected object as first argument");
    method.check.assert(method.check.object(data), "expected object as second argument");
    return await method.services.user.login(data);
  }

  async Register(data) {
    method.check.assert(method.check.object(method), "expected object as first argument");
    method.check.assert(method.check.object(data), "expected object as second argument");
    return await method.services.user.register(data);
  }

  async updateUsername(data) {
    method.check.assert(method.check.object(method), "expected object as first argument");
    method.check.assert(method.check.object(data), "expected object as second argument");
    await method.services.user.updateUsername(data);
  }

  async updatePassword(data) {
    method.check.assert(method.check.object(method), "expected object as first argument");
    method.check.assert(method.check.object(data), "expected object as second argument");
    await method.services.user.updatePassword(data);
  }

  async remove(data) {
    method.check.assert(method.check.object(method), "expected object as first argument");
    method.check.assert(method.check.object(data), "expected object as second argument");
    await method.services.user.remove(data);
  }
}
