import React from "react";
import { Link } from "react-router-dom";

class Main extends React.Component {
  render() {
    return (
      <div>
        <div style={{ "text-align": "center" }}>
          <p>
            <b>Showroom Temporarily Closed to the general public due to COVID-19</b>
          </p>
          <p>
            <b>For inquiries, please contact us at info@giocars.com or text/call 425.985.4259</b>
          </p>
        </div>
        <Link to="/">
          <img src={`${process.env.REACT_APP_API}/images/logo.jpg`} />
        </Link>
        <div>
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
