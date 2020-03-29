import React from "react";
import axios from "axios";
import check from "check-types";
import { Notice } from "../../globals/components";
import connect from "../../connect.js";

class Main extends React.Component {
  async createInventory(e) {
    e.preventDefault();
    const form = document.getElementById("formOne");
    const data = {
      thumbnail: "",
      item_type: form.item_type.value,
      make: form.make.value,
      model: form.model.value,
      year: Number(form.year.value),
      stock: form.stock.value,
      vin: form.vin.value,
      mileage: Number(form.mileage.value),
      title: form.title.value,
      sold: form.sold.value === "0" ? false : true,
      price: Number(form.price.value),
      description: form.description.value,
      color: form.color.value,
      engine: form.engine.value,
      transmission: form.transmission.value,
      options: form.options.value,
      item_condition: form.condition.value
    };
    check.assert(check.number(data.year), "year must be of type number");
    check.assert(check.number(data.mileage), "mileage must be of type number");
    check.assert(check.number(data.price), "price must be of type number");
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/inventory/create`, data);
      if (response.data.error) {
        throw new Error(response.data.error.detail);
      }
      this.props.history.push(`/admin/inventory/upload/${response.data.data._id}`);
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
          <input type="text" name="item_type" placeholder="type" />
          <input type="text" name="make" placeholder="make" />
          <input type="text" name="model" placeholder="model" />
          <input type="text" name="year" placeholder="year" />
          <input type="text" name="stock" placeholder="stock" />
          <input type="text" name="vin" placeholder="vin" />
          <input type="text" name="mileage" placeholder="mileage" />
          <input type="text" name="title" placeholder="title" />
          <select name="sold">
            <option value="0">for sale</option>
            <option value="1">sold</option>
          </select>
          <input type="text" name="price" placeholder="price" />
          <textarea name="description" placeholder="description" />
          <textarea name="color" placeholder="color" />
          <textarea name="engine" placeholder="engine" />
          <textarea name="transmission" placeholder="transmission" />
          <textarea name="options" placeholder="options" />
          <textarea name="condition" placeholder="condition" />
          <input type="submit" value="create" />
        </form>
      </div>
    );
  }
}
export default connect(Main);
