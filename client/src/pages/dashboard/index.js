import React from "react";
import axios from "axios";
import { Menu, LoggedIn, Notice } from "../../globals/components";
import connect from "../../connect.js";

class Main extends React.Component {
  async newChat() {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/chat/request`, { chat_role: true });
      if (response.data.error) {
        throw new Error(response.data.error.detail);
      }
      this.props.history.push(`/taki/chat/${response.data.data.chat_id}`);
    } catch (e) {
      this.props.actions.notice.message(e.message);
    }
  }

  menu() {
    return [
      [
        "Account",
        () => {
          this.props.history.push("/account");
        }
      ],
      ["Listen", this.newChat.bind(this)],
      [
        "Vent",
        () => {
          this.props.history.push("/taki/categories");
        }
      ]
    ];
  }

  render() {
    return (
      <div>
        <LoggedIn />
        <h1>Dashboard</h1>
        <Notice />
        <hr />
        <Menu data={this.menu()} />
      </div>
    );
  }
}
export default connect(Main);
