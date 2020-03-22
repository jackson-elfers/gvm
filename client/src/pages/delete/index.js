import React from "react";
import axios from "axios";
import check from "check-types";
import { Notice, Back, LoggedIn } from "../../globals/components";
import connect from "../../connect.js";

class Main extends React.Component {
  async deleteAccount(e) {
    e.preventDefault();
    const form = document.getElementById("formOne");
    try {
      check.assert(form.deleteme.value === "delete me", "please type 'delete me'");
      const response = await axios.delete(`${process.env.REACT_APP_API}/user/delete`);
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
        <LoggedIn />
        <Back to={`${process.env.REACT_APP_API}/account`} />
        <h1>Remove Account</h1>
        <Notice />
        <hr />
        <p>Are you sure? All your chat experience will be removed.</p>
        <form id="formOne" onSubmit={this.deleteAccount.bind(this)}>
          <input type="text" name="deleteme" placeholder="delete me" />
          <input type="submit" value="remove account" />
        </form>
      </div>
    );
  }
}
export default connect(Main);
