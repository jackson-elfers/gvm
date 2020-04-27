import React from "react";
import { Link } from "react-router-dom";

class Main extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">
          <img style={{ width: "175px" }} src={`${process.env.REACT_APP_API}/images/logo.jpg`} />
        </Link>
        <div>
          <Link to="/">
            <button>Home</button>
          </Link>
          <Link to="/inventory">
            <button>Inventory</button>
          </Link>
          <Link to="/sell">
            <button>Sell</button>
          </Link>
          <Link to="/wanted">
            <button>Wanted</button>
          </Link>
          <Link to="/locating">
            <button>Locating</button>
          </Link>
          <Link to="/shipping">
            <button>Shipping</button>
          </Link>
          <Link to="/contact">
            <button>Contact</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Main;
