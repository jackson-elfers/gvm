import React from "react";
import axios from "axios";
import check from "check-types";
import { Notice } from "../../globals/components";
import connect from "../../connect.js";

class Main extends React.Component {
  async logout(e) {
    e.preventDefault();
    const form = document.getElementById("formOne");
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/user/logout`);
      if (response.data.error) {
        throw new Error(response.data.error.detail);
      }
      this.props.actions.user.clear();
      this.props.history.push("/");
    } catch (e) {
      this.props.actions.notice.message(e.message);
    }
  }

  render() {
    return (
      <div>
        <h1>Logout</h1>
        <Notice />
        <hr />
        <p>Goodbye, hope to see you again soon!</p>
        <form id="formOne" onSubmit={this.logout.bind(this)}>
          <input type="submit" value="logout" />
        </form>
      </div>
    );
  }
}
export default connect(Main);
