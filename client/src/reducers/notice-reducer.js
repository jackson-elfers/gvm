import * as types from "../actions/action-types.js";
import initialState from "./initial-state.js";

export default function error(state = initialState.notice, action) {
  switch (action.type) {
    case types.NOTICE:
      return action.data;
    case types.CLEAR_NOTICE:
      return action.data;
    default:
      return state;
  }
}
