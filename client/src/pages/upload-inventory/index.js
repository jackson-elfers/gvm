import React from "react";
import axios from "axios";
import check from "check-types";
import { Notice } from "../../globals/components";

class Main extends React.Component {
  async upload(e) {
    e.preventDefault();
    const form = document.getElementById("formOne");
    const data = { username: form.username.value, password: form.password.value };
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/inventory/upload`, data);
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
        <h1>Upload Media</h1>
        <Notice />
        <hr />
        <form id="formOne" onSubmit={this.upload.bind(this)}>
          <input type="file" multiple />
          <input type="submit" value="upload" />
        </form>
      </div>
    );
  }
}
export default Main;
