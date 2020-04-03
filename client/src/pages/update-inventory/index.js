import React from "react";
import axios from "axios";
import check from "check-types";
import { Notice, Viewer } from "../../globals/components";
import connect from "../../connect.js";

class Main extends React.Component {
  async updateInventory(e) {
    e.preventDefault();
    const form = document.getElementById("formOne");
    const data = {
      item_type: form.type.value,
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
      item_condition: form.condition.value,
      _id: this.props.match.params._id
    };
    check.assert(check.number(data.year), "year must be of type number");
    check.assert(check.number(data.mileage), "mileage must be of type number");
    check.assert(check.number(data.price), "price must be of type number");
    try {
      const response = await axios.put(`${process.env.REACT_APP_API}/inventory/update`, data);
      if (response.data.error) {
        throw new Error(response.data.error.detail);
      }
      this.props.history.push(`/admin/inventory/upload/${response.data.data._id}`);
    } catch (e) {
      this.props.actions.notice.message(e.message);
    }
  }

  async loadItem() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/inventory/item/id/${this.props.match.params._id}`);
      if (response.data.error) {
        throw new Error(response.data.error.detail);
      }
      if (response.data.data.length === 0) {
        throw new Error("item doesn't exist");
      }
      const form = document.getElementById("formOne");
      form.type.value = response.data.data[0].item_type;
      form.make.value = response.data.data[0].make;
      form.model.value = response.data.data[0].model;
      form.year.value = response.data.data[0].year;
      form.stock.value = response.data.data[0].stock;
      form.vin.value = response.data.data[0].vin;
      form.mileage.value = response.data.data[0].mileage;
      form.title.value = response.data.data[0].title;
      form.sold.value = response.data.data[0].sold ? "1" : "0";
      form.price.value = response.data.data[0].price;
      form.description.value = response.data.data[0].description;
      form.color.value = response.data.data[0].color;
      form.engine.value = response.data.data[0].engine;
      form.transmission.value = response.data.data[0].transmission;
      form.options.value = response.data.data[0].options;
      form.condition.value = response.data.data[0].item_condition;
    } catch (e) {
      this.props.actions.notice.message(e.message);
    }
  }

  async componentDidMount() {
    await this.loadItem();
  }

  render() {
    return (
      <div>
        <h1>Update Inventory</h1>
        <Notice />
        <hr />
        <Viewer owner_id={this.props.match.params._id} />
        <form id="formOne" onSubmit={this.updateInventory.bind(this)}>
          <input type="text" name="type" placeholder="type" />
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
          <input type="submit" value="update" />
        </form>
      </div>
    );
  }
}

export default connect(Main);
