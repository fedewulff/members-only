const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

exports.homeGet = async (req, res) => {
  //console.log(req.user);
  const messages = await db.getMessages();

  res.render("home", { user: req.user, messages: messages });
};
