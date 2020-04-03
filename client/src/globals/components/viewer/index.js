import React from "react";
import { Link } from "react-router-dom";
import connect from "../../../connect.js";
import axios from "axios";

const Media = connect(
  class extends React.Component {
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
          <button onClick={this.removeMedia.bind(this)}>DELETE</button>
        </div>
      );

      return (
        <div>
          {this.props.globals.user !== null ? options : <div style={{ display: "none" }}></div>}
          <img src={`${process.env.REACT_APP_API}/files/read/storage/${this.props.data.storage_name}`} />
        </div>
      );
    }
  }
);

function Viewer(props) {
  var temp = [];
  for (var i = 0; i < props.data.length; ++i) {
    temp.push(
      <div key={props.data[i].storage_name}>
        <Media data={props.data[i]} handlers={props.handlers} />
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
      <div>
        <div>
          <div style={{ height: "600px", overflow: "scroll" }}>
            <Viewer data={this.state.data} handlers={[this.updateMedia.bind(this)]} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(Main);
