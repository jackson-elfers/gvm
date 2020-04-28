import React from "react";
import { withRouter } from "react-router-dom";
import connect from "../../../connect.js";

class Main extends React.Component {
  async componentDidMount() {
    await this.props.actions.user.set();
  }

  render() {
    return <div style={{ display: "none" }}></div>;
  }
}

export default connect(withRouter(Main));
