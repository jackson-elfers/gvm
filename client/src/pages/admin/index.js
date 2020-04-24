import React from "react";
import { Link } from "react-router-dom";
import { LoggedIn } from "../../globals/components";

class Main extends React.Component {
  render() {
    return (
      <div>
        <LoggedIn />
        <h1>Admin</h1>
        <hr />
        <hr />
        <Link to="/admin/inventory/create">
          <h3>Create Inventory</h3>
        </Link>
        <hr />
        <Link to="/account/logout">
          <h3>Logout</h3>
        </Link>
      </div>
    );
  }
}
export default Main;
