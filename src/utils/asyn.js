const api = require("./api");

// async error handling for routes
module.exports.route = function(mw) {
  return function(req, res, next) {
    mw(req, res, next).catch(e => {
      res.status(500);
      res.json(
        api.error({
          status: 500,
          detail: "An error has occurred on the server."
        })
      );
    });
  };
};
