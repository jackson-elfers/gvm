const axios = require("axios");
const asyn = require("./asyn");
const api = require("./api");

async function verify(data) {
  const response = await axios.post("https://www.google.com/recaptcha/api/siteverify", null, { params: data });
  if (!response.data.success) {
    throw new Error(response["error-codes"]);
  }
}

module.exports.verify = asyn.route(async function(req, res, next) {
  try {
    await verify({ secret: process.env.RECAPTCHA_SECRET_KEY, response: req.body.recaptcha_token });
    next();
  } catch (e) {
    res.json(
      utils.api.error({
        status: 401,
        detail: "recaptcha failed to verify"
      })
    );
  }
});
