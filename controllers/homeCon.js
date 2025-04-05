const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

exports.homeGet = (req, res) => {
  //console.log(req.user);
  res.render("home", { user: req.user });
};
