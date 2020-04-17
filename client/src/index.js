import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import "./globals/styles";
import {
  Home,
  Account,
  Admin,
  Login,
  Logout,
  Register,
  UpdateUsername,
  UpdatePassword,
  Delete,
  Inventory,
  Sell,
  Wanted,
  Locating,
  Shipping,
  Contact,
  Item,
  CreateInventory,
  UpdateInventory,
  DeleteInventory,
  UploadInventory,
  NotFound
} from "./pages";
import { Header, Footer } from "./globals/components";
import * as serviceWorker from "./serviceWorker";

const store = createStore(rootReducer, applyMiddleware(thunk));

const routing = (
  <Provider store={store}>
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/account/login" component={Login} />
          <Route exact path="/account/logout" component={Logout} />
          <Route exact path="/account/register" component={Register} />
          <Route exact path="/account/update/username" component={UpdateUsername} />
          <Route exact path="/account/update/password" component={UpdatePassword} />
          <Route exact path="/account/delete" component={Delete} />
          <Route exact path="/inventory" component={Inventory} />
          <Route exact path="/sell" component={Sell} />
          <Route exact path="/wanted" component={Wanted} />
          <Route exact path="/locating" component={Locating} />
          <Route exact path="/shipping" component={Shipping} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/item/:url_title" component={Item} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/admin/inventory/create" component={CreateInventory} />
          <Route exact path="/admin/inventory/update/:_id" component={UpdateInventory} />
          <Route exact path="/admin/inventory/delete/:_id" component={DeleteInventory} />
          <Route exact path="/admin/inventory/upload/:_id" component={UploadInventory} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div>
    </Router>
  </Provider>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
