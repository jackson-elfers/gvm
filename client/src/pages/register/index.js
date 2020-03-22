import React from "react";
import axios from "axios";
import check from "check-types";
import { Notice } from "../../globals/components";
import connect from "../../connect.js";
import ReCaptcha from "react-google-recaptcha";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recaptcha_token: null
    };
  }

  async register(e) {
    e.preventDefault();
    const form = document.getElementById("formOne");
    const data = {
      username: form.username.value,
      password: form.password.value,
      recaptcha_token: this.state.recaptcha_token
    };
    try {
      check.assert(this.state.recaptcha_token !== null, "please check 'I'm not a robot'");
      check.assert(data.password === form.confirm.value, "passwords don't match");
      const response = await axios.post(`${process.env.REACT_APP_API}/user/register`, data);
      if (response.data.error) {
        throw new Error(response.data.error.detail);
      }
      this.props.history.push("/account/login");
    } catch (e) {
      this.props.actions.notice.message(e.message);
    }
  }

  reCaptcha(token) {
    this.setState({ recaptcha_token: token });
  }

  render() {
    return (
      <div>
        <h1>Register</h1>
        <Notice />
        <hr />
        <form id="formOne" onSubmit={this.register.bind(this)}>
          <input type="text" name="username" placeholder="username" />
          <input type="password" name="password" placeholder="password" />
          <input type="password" name="confirm" placeholder="password confirm" />
          <input type="submit" value="register" />
        </form>
        <ReCaptcha sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} onChange={this.reCaptcha.bind(this)} />
      </div>
    );
  }
}
export default connect(Main);
