const { body, validationResult } = require("express-validator");
const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const CustomError = require("../errors/customError");

exports.becomeMemberGet = (req, res) => {
  res.render("becomeMember");
};
