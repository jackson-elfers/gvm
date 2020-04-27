import React from "react";
import { Link } from "react-router-dom";
import connect from "../../../connect.js";
import axios from "axios";

const Media = connect(
  class extends React.Component {
    async updateThumbnail() {
      try {
        const response = await axios.put(`${process.env.REACT_APP_API}/inventory/update/thumbnail`, {
          _id: this.props.owner_id,
          thumbnail: this.props.data.storage_name
        });
        if (response.data.error) {
          throw new Error(response.data.error.detail);
        }
      } catch (e) {
        this.props.actions.notice.message(e.message);
      }
    }

    async removeMedia() {
      try {
        await axios.delete(`${process.env.REACT_APP_API}/files/delete/${this.props.data.storage_name}`);
        await this.props.handlers[0]();
      } catch (e) {
        this.props.actions.notice.message(e.message);
      }
    }

    render() {
      const options = (
        <div>
          <button onClick={this.updateThumbnail.bind(this)}>Update Thumbnail</button>
          <button onClick={this.removeMedia.bind(this)}>DELETE</button>
        </div>
      );

      return (
        <div style={{ "box-shadow": "none" }}>
          {this.props.globals.user !== null ? options : <div style={{ display: "none" }}></div>}
          <img
            style={{ width: "100%" }}
            src={`${process.env.REACT_APP_API}/files/read/storage/${this.props.data.storage_name}`}
          />
        </div>
      );
    }
  }
);

function Viewer(props) {
  var temp = [];
  for (var i = 0; i < props.data.length; ++i) {
    temp.push(
      <div style={{ "box-shadow": "none" }} key={props.data[i].storage_name}>
        <Media owner_id={props.owner_id} data={props.data[i]} handlers={props.handlers} />
      </div>
    );
  }
  return temp;
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  async getMedia() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/files/read/owner/${this.props.owner_id}`);
      if (response.data.error) {
        throw new Error(response.data.error.detail);
      }
      this.setState({ data: response.data.data });
    } catch (e) {
      this.props.actions.notice.message(e.message);
    }
  }

  async updateMedia() {
    await this.getMedia();
  }

  async componentDidMount() {
    await this.getMedia();
  }

  render() {
    return (
      <div style={{ height: "600px", overflow: "scroll" }}>
        <Viewer owner_id={this.props.owner_id} data={this.state.data} handlers={[this.updateMedia.bind(this)]} />
      </div>
    );
  }
}

export default connect(Main);
