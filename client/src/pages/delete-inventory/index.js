import React from "react";
import axios from "axios";
import check from "check-types";
import { Notice } from "../../globals/components";

class Main extends React.Component {
  async removeImages(data) {
    // remove all media
  }

  async remove(e) {
    e.preventDefault();
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API}/inventory/delete/${this.props.params._id}`);
      if (response.data.error) {
        throw new Error(response.data.error.detail);
      }
      await this.props.actions.user.set();
      this.props.history.push("/");
    } catch (e) {
      this.props.actions.notice.message(e.message);
    }
  }

  render() {
    return (
      <div>
        <h1>Delete</h1>
        <Notice />
        <hr />
        <form id="formOne" onSubmit={this.remove.bind(this)}>
          <input type="text" name="deleteme" placeholder="write 'delete me'" />
          <input type="submit" value="delete" />
        </form>
      </div>
    );
  }
}
export default Main;
