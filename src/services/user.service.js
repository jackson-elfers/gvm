export default class Main {
  constructor(props) {
    this.method = props.method;
  }

  async login(data) {
    this.method.check.assert(this.method.check.object(this.method), "expected object as first argument");
    this.method.check.assert(this.method.check.object(data), "expected object as second argument");
    this.method.check.assert(this.method.check.string(data.username), "username must be of type string");
    this.method.check.assert(this.method.check.string(data.password), "password must be of type string");
    const user = await this.method.db.actions.user.readSingle(data);
    this.method.check.assert(user.results.length !== 0, "username doesn't exist");
    this.method.check.assert(
      await this.method.utils.bcrypt.compare(data.password, user.results[0].password),
      "password is incorrect"
    );
    return {
      jwt: await this.method.utils.jwt.sign({
        _id: user.results[0]._id,
        username: user.results[0].username
      })
    };
  }

  async register(data) {
    this.method.check.assert(this.method.check.object(this.method), "expected object as first argument");
    this.method.check.assert(this.method.check.object(data), "expected object as second argument");
    this.method.check.assert(this.method.check.string(data.username), "username must be of type string");
    this.method.check.assert(
      data.username.length >= this.method.config.user.username.min,
      "username min is ${ this.method.config.user.username.min } characters"
    );
    this.method.check.assert(
      data.username.length <= this.method.config.user.username.max,
      "username max is ${ this.method.config.user.username.max } characters"
    );
    this.method.check.assert(this.method.check.string(data.password), "password must be of type string");
    this.method.check.assert(
      data.password.length >= this.method.config.user.password.min,
      "password min is ${ this.method.config.user.password.min } characters"
    );
    this.method.check.assert(
      data.password.length <= this.method.config.user.password.max,
      "password max is ${ this.method.config.user.password.max } characters"
    );
    const user = await this.method.db.actions.user.readSingle(data);
    this.method.check.assert(user.results.length === 0, "username must be unique");
    return {
      _id: (
        await this.method.db.actions.user.create({
          username: data.username,
          password: await this.method.utils.bcrypt.hash(data.password)
        })
      ).info._id
    };
  }

  async updateUsername(data) {
    this.method.check.assert(this.method.check.object(this.method), "expected object as first argument");
    this.method.check.assert(this.method.check.object(data), "expected object as second argument");
    this.method.check.assert(this.method.check.string(data._id), "_id must be of type string");
    this.method.check.assert(this.method.check.string(data.username), "username must be of type string");
    this.method.check.assert(
      data.username.length >= this.method.config.user.username.min,
      "username min is ${ this.method.config.user.username.min } characters"
    );
    this.method.check.assert(
      data.username.length <= this.method.config.user.username.max,
      "username max is ${ this.method.config.user.username.max } characters"
    );
    await this.method.db.actions.user.updateUsername(data);
  }

  async updatePassword(data) {
    this.method.check.assert(this.method.check.object(this.method), "expected object as first argument");
    this.method.check.assert(this.method.check.object(data), "expected object as second argument");
    this.method.check.assert(this.method.check.string(data._id), "_id must be of type string");
    this.method.check.assert(this.method.check.string(data.password), "password must be of type string");
    this.method.check.assert(
      data.password.length >= this.method.config.user.password.min,
      "password min is ${ this.method.config.user.password.min } characters"
    );
    this.method.check.assert(
      data.password.length <= this.method.config.user.password.max,
      "password max is ${ this.method.config.user.password.max } characters"
    );
    data.password = await this.method.utils.bcrypt.hash(data.password);
    await this.method.db.actions.user.updatePassword(data);
  }

  async remove(data) {
    this.method.check.assert(this.method.check.object(this.method), "expected object as first argument");
    this.method.check.assert(this.method.check.object(data), "expected object as second argument");
    this.method.check.assert(this.method.check.string(data._id), "_id must be of type string");
    await this.method.db.actions.user.delete(data);
  }
}
