import React from "react";
import axios from "axios";
import check from "check-types";
import { Notice, Back, LoggedIn } from "../../globals/components";
import connect from "../../connect.js";

class Main extends React.Component {
  async updateUsername(e) {
    e.preventDefault();
    const form = document.getElementById("formOne");
    const data = { username: form.username.value };
    try {
      const response = await axios.put(`${process.env.REACT_APP_API}/user/update/username`, data);
      if (response.data.error) {
        throw new Error(response.data.error.detail);
      }
      form.username.value = "";
      this.props.actions.notice.message("username updated successfully!");
    } catch (e) {
      this.props.actions.notice.message(e.message);
    }
  }

  render() {
    return (
      <div>
        <LoggedIn />
        <Back to={`${process.env.REACT_APP_API}/account`} />
        <h1>Update Username</h1>
        <Notice />
        <hr />
        <form id="formOne" onSubmit={this.updateUsername.bind(this)}>
          <input type="text" name="username" placeholder="username" />
          <input type="submit" value="update" />
        </form>
      </div>
    );
  }
}
export default connect(Main);
