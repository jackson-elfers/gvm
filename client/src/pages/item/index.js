import React from "react";
import { Notice, Viewer } from "../../globals/components";
import { Link } from "react-router-dom";
import connect from "../../connect.js";
import axios from "axios";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loading: true
    };
  }

  async loadItem() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/inventory/item/title/${this.props.match.params.url_title}`
      );
      if (response.data.error) {
        throw new Error(response.data.error.detail);
      }
      if (response.data.data.length === 0) {
        throw new Error("item doesn't exist");
      }
      this.setState({ data: response.data.data[0] });
    } catch (e) {
      this.props.actions.notice.message(e.message);
    }
  }

  async componentDidMount() {
    await this.loadItem();
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <div style={{ display: "none" }}></div>;
    }
    const options = (
      <div>
        <Link to={`/admin/inventory/update/${this.state.data._id}`}>
          <button>Update Item</button>
        </Link>
        <Link to={`/admin/inventory/delete/${this.state.data._id}`}>
          <button>Delete Item</button>
        </Link>
      </div>
    );

    return (
      <div>
        <h1>Item</h1>
        <Notice />
        <hr />
        {this.props.globals.user !== null ? options : <div style={{ display: "none" }}></div>}
        <h3>{`${this.state.data.sold ? "SOLD" : ""} ${this.state.data.year === 0 ? "" : this.state.data.year} ${
          this.state.data.make
        } ${this.state.data.model} $${this.state.data.price}`}</h3>
        <Viewer owner_id={this.state.data._id} />
        <h3>Price</h3>
        <hr />
        <p>{`$${this.state.data.price}`}</p>
        <hr />
        <h3>Description</h3>
        <hr />
        <p>{this.state.data.description}</p>
        <h3>Stock</h3>
        <hr />
        <p>{this.state.data.stock}</p>
        <h3>Vin</h3>
        <hr />
        <p>{this.state.data.vin}</p>
        <h3>Mileage</h3>
        <hr />
        <p>{this.state.data.mileage}</p>
        <h3>Color</h3>
        <hr />
        <p>{this.state.data.color}</p>
        <h3>Engine</h3>
        <hr />
        <p>{this.state.data.engine}</p>
        <h3>Transmission</h3>
        <hr />
        <p>{this.state.data.transmission}</p>
        <h3>Options</h3>
        <hr />
        <p>{this.state.data.options}</p>
        <h3>Condition</h3>
        <hr />
        <p>{this.state.data.item_condition}</p>
      </div>
    );
  }
}
export default connect(Main);
