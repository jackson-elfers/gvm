import { combineReducers } from "redux";
import notice from "./notice-reducer";
import user from "./user-reducer";

export default combineReducers({ notice, user });
