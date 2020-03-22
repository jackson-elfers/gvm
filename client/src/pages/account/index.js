import React from "react";
import { Menu, LoggedIn } from "../../globals/components";
import connect from "../../connect.js";

class Main extends React.Component {
  menu() {
    return [
      [
        "Update Username",
        () => {
          this.props.history.push("/account/update/username");
        }
      ],
      [
        "Update Password",
        () => {
          this.props.history.push("/account/update/password");
        }
      ],
      [
        "Delete Account",
        () => {
          this.props.history.push("/account/delete");
        }
      ]
    ];
  }

  render() {
    return (
      <div>
        <LoggedIn />
        <h1>Account</h1>
        <hr />
        <Menu data={this.menu()} />
      </div>
    );
  }
}

export default connect(Main);
