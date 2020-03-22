import React from "react";
import { Link } from "react-router-dom";
import connect from "../../../connect.js";

function Nav(props) {
  const nav = { float: "right", backgroundColor: "rgba(0, 0, 0, 0)", padding: "2px" };
  if (props.user) {
    return (
      <div>
        <Link to="/account/logout">
          <button style={nav}>logout</button>
        </Link>
        <Link to="/taki/dashboard">
          <button style={nav}>{`hi ${props.user.username}`}</button>
        </Link>
      </div>
    );
  } else {
    return (
      <div>
        <Link to="/account/register">
          <button style={nav}>register</button>
        </Link>
        <Link to="/account/login">
          <button style={nav}>login</button>
        </Link>
      </div>
    );
  }
}

class Main extends React.Component {
  async componentDidMount() {
    await this.props.actions.user.set();
  }

  render() {
    return (
      <div>
        <Link to="/">
          <h2>Bontaki</h2>
        </Link>
        <div style={{ height: "50px" }}>
          <Nav user={this.props.globals.user} />
        </div>
      </div>
    );
  }
}

export default connect(Main);
