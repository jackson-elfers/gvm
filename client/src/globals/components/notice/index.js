import React from "react";
import connect from "../../../connect.js";

class Main extends React.Component {
  clear() {
    this.props.actions.notice.clear();
  }

  componentWillUnmount() {
    this.props.actions.notice.clear();
  }

  render() {
    return (
      <div style={this.props.globals.notice === null ? { display: "none" } : { display: "block" }}>
        <h3>{this.props.globals.notice}</h3>
        <button onClick={this.clear.bind(this)}>confirm</button>
      </div>
    );
  }
}

export default connect(Main);
