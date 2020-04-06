import React from "react";
import axios from "axios";
import check from "check-types";
import { Notice } from "../../globals/components";
import connect from "../../connect.js";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }

  async updateThumbnail(data) {
    try {
      console.log(data);
      const response = await axios.put(`${process.env.REACT_APP_API}/inventory/update/thumbnail`, {
        _id: this.props.match.params._id,
        thumbnail: data.thumbnail
      });
      if (response.data.error) {
        throw new Error(response.data.error.detail);
      }
    } catch (e) {
      this.props.actions.notice.message(e.message);
    }
  }

  async upload(e) {
    e.preventDefault();
    const form = document.getElementById("formOne");
    const file_meta = {
      _id: this.props.match.params._id,
      file_name: form.uploads.files[this.state.index.toString()].name
    };
    const headers = { "Content-Type": "application/octet-stream", file_meta: JSON.stringify(file_meta) };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/files/create`,
        form.uploads.files.item(this.state.index),
        { headers: headers }
      );
      if (response.data.error) {
        throw new Error(response.data.error.detail);
      }
      if (this.state.index === 0) {
        await this.updateThumbnail({ thumbnail: response.data.data.storage_name });
      }
      if (this.state.index === form.uploads.files.length - 1) {
        this.setState({ index: 0 });
        //this.props.history.push(`/item/${response.data.data.url_title}`);
        console.log("complete!");
        return;
      }
      this.setState({ index: ++this.state.index }, async () => {
        await this.upload(e);
      });
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
          <input type="file" name="uploads" multiple />
          <input type="submit" value="upload" />
        </form>
      </div>
    );
  }
}
export default connect(Main);
