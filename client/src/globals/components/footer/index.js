import React from "react";
import { Link } from "react-router-dom";

class Main extends React.Component {
  componentDidMount() {
    console.log("yes");
  }

  render() {
    return (
      <div style={{ "text-align": "center" }}>
        <h3>Ask about consigning, purchasing or appraising your vehicle!</h3>
        <Link style={{ color: "black", "text-decoration": "none" }} to="/admin">
          <p>
            The information available on this website compiled by GVM and other reliable sources including information
            provided by previous owners. However, we disclaim any responsibility or liability for the accuracy,
            completeness or timeliness of the information presented.
          </p>
          <p>
            All information, material, data, creative content, formats and photographic content in this website is
            copyrighted © 2008-{new Date().getFullYear()} by Giordano's Vintage Motors, LLC. All logos are owned by
            their prospective companies.
          </p>
        </Link>
      </div>
    );
  }
}

export default Main;
