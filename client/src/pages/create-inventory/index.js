import React from "react";
import { Notice } from "../../globals/components";
import axios from "axios";

class Main extends React.Component {
  async createInventory(e) {
    e.preventDefault();
    const form = document.getElementById("formOne");
    const data = { username: form.username.value, password: form.password.value };
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/inventory/create`, data);
      if (response.data.error) {
        throw new Error(response.data.error.detail);
      }
      await this.props.actions.user.set();
      this.props.history.push("/taki/dashboard");
    } catch (e) {
      this.props.actions.notice.message(e.message);
    }
  }

  render() {
    return (
      <div>
        <h1>Create Inventory</h1>
        <Notice />
        <hr />
        <form id="formOne" onSubmit={this.createInventory.bind(this)}>
          <input type="text" name="type" placeholder="type" />
          <input type="text" name="make" placeholder="make" />
          <input type="text" name="model" placeholder="model" />
          <input type="text" name="year" placeholder="year" />
          <input type="text" name="stock" placeholder="stock" />
          <input type="text" name="vin" placeholder="vin" />
          <input type="text" name="mileage" placeholder="mileage" />
          <input type="text" name="title" placeholder="title" />
          <input type="text" name="price" placeholder="price" />
          <textarea name="description" placeholder="description" />
          <textarea name="color" placeholder="color" />
          <textarea name="engine" placeholder="engine" />
          <textarea name="transmisson" placeholder="transmission" />
          <textarea name="options" placeholder="options" />
          <textarea name="condition" placeholder="condition" />
          <input type="submit" value="create" />
        </form>
      </div>
    );
  }
}
export default Main;
