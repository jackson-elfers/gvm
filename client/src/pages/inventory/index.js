import React from "react";
import axios from "axios";
import { Notice, Viewer } from "../../globals/components";
import connect from "../../connect.js";

function Slides(props) {
  var temp = [];
  for (var i = 0; i < props.data.length; ++i) {
    temp.push(
      <div key={props.data[i]._id}>
        <p>{props.data[i]._id}</p>
        <img src={props.data[i].thumbnail} />
      </div>
    );
  }
  return temp;
}

function SelectOptions(props) {
  var temp = [];
  for (var i = 0; i < props.data.length; ++i) {
    temp.push(
      <option key={props.data[i].selection} value={props.data[i].selection}>
        {props.data[i].selection}
      </option>
    );
  }
  return temp;
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      item_type_select: [],
      year_select: [],
      make_select: [],
      model_select: [],
      item_type: "null",
      year: "null",
      make: "null",
      model: "null",
      index: 0
    };
  }

  async loadInventory(data) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/inventory/select/${this.state.item_type}/${this.state.year}/${this.state.make}/${this.state.model}/${this.state.index}/10`
      );
      if (response.data.error) {
        throw new Error(response.data.error.detail);
      }
      console.log(response.data.data);
      this.setState({ data: response.data.data });
    } catch (e) {
      this.props.actions.notice.message(e.message);
    }
  }

  async changeSelect() {
    const form = document.getElementById("formOne");
    this.setState(
      { item_type: form.item_type.value, year: form.year.value, make: form.make.value, model: form.model.value },
      async () => {
        await this.loadInventory();
      }
    );
  }

  async loadSelect(data) {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/inventory/${data.select}`);
      if (response.data.error) {
        throw new Error(response.data.error.detail);
      }
      return response.data.data;
    } catch (e) {
      this.props.actions.notice.message(e.message);
    }
  }

  async getSelect() {
    const item_type = await this.loadSelect({ select: "item_type" });
    const year = await this.loadSelect({ select: "year" });
    const make = await this.loadSelect({ select: "make" });
    const model = await this.loadSelect({ select: "model" });
    this.setState({ item_type_select: item_type, year_select: year, make_select: make, model_select: model });
  }

  async nextIndex() {
    this.setState({ index: ++this.state.index }, async () => {
      await this.loadInventory();
    });
  }

  async componentDidMount() {
    await this.getSelect();
    await this.loadInventory();
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <div></div>;
    }
    return (
      <div>
        <h1>Inventory</h1>
        <Notice />
        <hr />
        <h3>Category</h3>
        <form id="formOne">
          <select onChange={this.changeSelect.bind(this)} name="item_type">
            <SelectOptions data={this.state.item_type_select} />
          </select>
          <h3>Year</h3>
          <select onChange={this.changeSelect.bind(this)} name="year">
            <SelectOptions data={this.state.year_select} />
          </select>
          <h3>Make</h3>
          <select onChange={this.changeSelect.bind(this)} name="make">
            <SelectOptions data={this.state.make_select} />
          </select>
          <h3>Model</h3>
          <select onChange={this.changeSelect.bind(this)} name="model">
            <SelectOptions data={this.state.model_select} />
          </select>
        </form>

        <Slides data={this.state.data} />
        <button onClick={this.nextIndex.bind(this)}>Load More</button>
      </div>
    );
  }
}
export default connect(Main);
