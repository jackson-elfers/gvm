import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as noticeActions from "./actions/notice-actions.js";
import * as userActions from "./actions/user-actions.js";

function mapStateToProps(state) {
  return {
    globals: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      user: bindActionCreators(userActions, dispatch),
      notice: bindActionCreators(noticeActions, dispatch)
    }
  };
}

export default function(component) {
  return connect(mapStateToProps, mapDispatchToProps)(component);
}
