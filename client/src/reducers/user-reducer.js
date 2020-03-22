import * as types from "../actions/action-types.js";
import initialState from "./initial-state.js";

export default function error(state = initialState.user, action) {
  switch (action.type) {
    case types.SET_USER:
      return action.data;
    case types.CLEAR_USER:
      return action.data;
    default:
      return state;
  }
}
