import React from "react";
import axios from "axios";
import check from "check-types";
import { Notice } from "../../globals/components";
import connect from "../../connect.js";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      media: [],
      index: 0
    };
  }

  async getMedia() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/files/read/owner/${this.props.match.params._id}`);
      if (response.data.error) {
        throw new Error(response.data.error.detail);
      }
      this.setState({ media: response.data.data });
    } catch (e) {
      this.props.actions.notice.message(e.message);
    }
  }

  async removeMedia() {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API}/files/delete/${this.state.media[this.state.index].storage_name}`
      );
      if (this.state.index !== this.state.media.length - 1) {
        this.setState({ index: ++this.state.index }, async () => {
          await this.removeMedia();
        });
      }
    } catch (e) {
      this.props.actions.notice.message(e.message);
    }
  }

  async remove(e) {
    e.preventDefault();
    try {
      await this.removeMedia();
      const response = await axios.delete(
        `${process.env.REACT_APP_API}/inventory/delete/${this.props.match.params._id}`
      );
      if (response.data.error) {
        throw new Error(response.data.error.detail);
      }
      await this.props.actions.user.set();
      this.props.history.push("/");
    } catch (e) {
      this.props.actions.notice.message(e.message);
    }
  }

  async componentDidMount() {
    await this.getMedia();
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
export default connect(Main);
