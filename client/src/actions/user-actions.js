import axios from "axios";

export function set(obj) {
  return async dispatch => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/user/info`);
      if (response.data.error) {
        throw new Error(response.data.error.detail);
      }
      dispatch({ type: "SET_USER", data: response.data.data });
    } catch (e) {
      dispatch({ type: "SET_USER", data: null });
    }
  };
}

export function clear() {
  return dispatch => {
    dispatch({ type: "CLEAR_USER", data: null });
  };
}
