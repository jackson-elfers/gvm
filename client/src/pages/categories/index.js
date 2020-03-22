import React from "react";
import axios from "axios";
import { Menu, LoggedIn, Notice } from "../../globals/components";
import connect from "../../connect.js";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  async newChat(e) {
    try {
      const index = Number(e.target.getAttribute("data-index"));
      const response = await axios.post(`${process.env.REACT_APP_API}/chat/request`, {
        chat_role: false,
        categ: index
      });
      if (response.data.error) {
        throw new Error(response.data.error.detail);
      }
      this.props.history.push(`/taki/chat/${response.data.data.chat_id}`);
    } catch (e) {
      this.props.actions.notice.message(e.message);
    }
  }

  async getCategories(e) {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/chat/categories`);
      if (response.data.error) {
        throw new Error(response.data.error.detail);
      }
      return response.data.data;
    } catch (e) {
      this.props.actions.notice.message(e.message);
      return [];
    }
  }

  async getCategoriesMenu() {
    const categs = await this.getCategories();
    const list = [];
    for (var i = 0; i < categs.length; ++i) {
      list.push([categs[i], this.newChat.bind(this)]);
    }
    this.setState({ categories: list });
  }

  async componentDidMount() {
    await this.getCategoriesMenu();
  }

  render() {
    return (
      <div>
        <LoggedIn />
        <h1>Categories</h1>
        <Notice />
        <hr />
        <Menu data={this.state.categories} />
      </div>
    );
  }
}
export default connect(Main);
