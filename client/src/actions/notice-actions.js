export function message(string) {
  return dispatch => {
    dispatch({ type: "NOTICE", data: string });
  };
}

export function clear() {
  return (dispatch, getState) => {
    dispatch({ type: "CLEAR_NOTICE", data: null });
  };
}
