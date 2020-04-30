import React from "react";
import axios from "axios";
import check from "check-types";
import { Notice } from "../../globals/components";
import connect from "../../connect.js";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      uploading: false,
      index: 0
    };
  }

  async loadItem() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/inventory/item/id/${this.props.match.params._id}`);
      if (response.data.error) {
        throw new Error(response.data.error.detail);
      }
      if (response.data.data.length === 0) {
        throw new Error("item doesn't exist");
      }
      this.setState({ data: response.data.data[0] });
    } catch (e) {
      this.props.actions.notice.message(e.message);
    }
  }

  async updateThumbnail(data) {
    try {
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

  async nextUpload(e) {
    const form = document.getElementById("formOne");
    if (this.state.index === form.uploads.files.length - 1) {
      this.setState({ index: 0 });
      this.setState({ uploading: false });
      console.log("complete!");
      this.props.history.push(`/item/${this.state.data.url_title}`);
      return;
    }
    this.setState({ index: ++this.state.index }, async () => {
      await this.upload(e);
    });
  }

  async upload(e) {
    e.preventDefault();
    const form = document.getElementById("formOne");
    try {
      this.setState({ uploading: true });
      const file_meta = {
        _id: this.props.match.params._id,
        file_name: form.uploads.files[this.state.index.toString()].name
      };
      const headers = { "Content-Type": "application/octet-stream", file_meta: JSON.stringify(file_meta) };
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
      await this.nextUpload(e);
    } catch (e) {
      await this.nextUpload(e);
      this.props.actions.notice.message(e.message);
    }
  }

  async componentDidMount() {
    await this.loadItem();
  }

  render() {
    return (
      <div>
        <h1>Upload Media</h1>
        <Notice />
        <hr />
        <div style={this.state.uploading ? { display: "block" } : { display: "none" }}>
          <img src={`${process.env.REACT_APP_API}/images/spinner.gif`} />
        </div>
        <form
          style={this.state.uploading ? { display: "none" } : { display: "block" }}
          id="formOne"
          onSubmit={this.upload.bind(this)}
        >
          <input type="file" name="uploads" multiple />
          <input type="submit" value="upload" />
        </form>
        <button
          onClick={() => {
            this.props.history.push(`/item/${this.state.data.url_title}`);
          }}
        >
          Skip
        </button>
      </div>
    );
  }
}
export default connect(Main);
