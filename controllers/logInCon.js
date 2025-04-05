const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

exports.logInGet = (req, res) => {
  res.render("login");
};

exports.logInPost = (req, res) => {
  console.log(req.body);
  res.end();
};
