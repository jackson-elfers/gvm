import React from "react";
import { Link } from "react-router-dom";

function Main(props) {
  var comp = [];
  for (var i = 0; i < props.data.length; ++i) {
    comp.push(
      <div key={props.data[i][0]}>
        <h3 style={{ cursor: "pointer" }} data-index={i} onClick={props.data[i][1]}>
          {props.data[i][0]}
        </h3>
        <hr />
      </div>
    );
  }
  return comp;
}

export default Main;
