import React from "react";
import { Link } from "react-router-dom";
import connect from "../../../connect.js";

function Main(props) {
  return (
    <div>
      <Link to={props.to}>
        <h3>Back</h3>
      </Link>
    </div>
  );
}

export default connect(Main);
