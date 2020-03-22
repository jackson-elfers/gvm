module.exports = function(app) {
  // middleware
  require("./middleware")(app);

  // routes
  require("./routes")(app);
};
