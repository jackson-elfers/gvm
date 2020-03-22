const check = require("check-types");

function error400(data) {
  return {
    status: "400",
    title: "Bad Request",
    detail: data.detail,
    type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400"
  };
}

function error401(data) {
  return {
    status: "401",
    title: "Unauthorized",
    detail: data.detail,
    type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401"
  };
}

function error500(data) {
  return {
    status: "500",
    title: "Internal Server Error",
    detail: data.detail,
    type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500"
  };
}

function errorUnknown(data) {
  return {
    status: "unknown",
    title: "Error Not Identified",
    detail: data.detail,
    type: ""
  };
}

function status(data) {
  switch (data.status) {
    case 400:
      return error400(data);
      break;
    case 401:
      return error401(data);
      break;
    case 500:
      return error500(data);
      break;
    default:
      return errorUnknown(data);
      break;
  }
}

module.exports.error = function(data) {
  check.assert(check.object(data), "expected object as first argument");
  check.assert(check.number(data.status), "status must be of type number");
  check.assert(check.string(data.detail), "detail must be of type string");
  return {
    error: status(data),
    data: null
  };
};

module.exports.send = function(data) {
  check.assert(
    check.object(data) || check.array(data) || check.null(data),
    "expected object, array or null as first argument"
  );
  return {
    error: null,
    data: data
  };
};
