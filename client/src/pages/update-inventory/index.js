import React from "react";
import axios from "axios";
import check from "check-types";
import { Notice } from "../../globals/components";

class Main extends React.Component {
  async updateInventory(e) {
    e.preventDefault();
    const form = document.getElementById("formOne");
    const data = {
      type: form.type.value,
      make: form.make.value,
      model: form.model.value,
      year: form.year.value,
      stock: form.stock.value,
      vin: form.vin.value,
      mileage: form.mileage.value,
      title: form.title.value,
      price: Number(form.price.value),
      description: form.description.value,
      color: form.color.value,
      engine: form.engine.value,
      transmission: form.transmission.value,
      options: form.options.value,
      condition: form.condition.value
    };
    check.assert(check.number(data.price), "price must be of type number");
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
        <h1>Update Inventory</h1>
        <Notice />
        <hr />
        <form id="formOne" onSubmit={this.updateInventory.bind(this)}>
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
          <input type="submit" value="update" />
        </form>
      </div>
    );
  }
}

export default Main;
