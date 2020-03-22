import React from "react";
import axios from "axios";
import check from "check-types";
import { Notice } from "../../globals/components";
import connect from "../../connect.js";

class Main extends React.Component {
  async login(e) {
    e.preventDefault();
    const form = document.getElementById("formOne");
    const data = { username: form.username.value, password: form.password.value };
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/user/login`, data);
      if (response.data.error) {
        throw new Error(response.data.error.detail);
      }
      await this.props.actions.user.set();
      this.props.history.push("/taki/dashboard");
    } catch (e) {
      this.props.actions.notice.message(e.message);
    }
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <Notice />
        <hr />
        <form id="formOne" onSubmit={this.login.bind(this)}>
          <input type="text" name="username" placeholder="username" />
          <input type="password" name="password" placeholder="password" />
          <input type="submit" value="login" />
        </form>
      </div>
    );
  }
}
export default connect(Main);
