const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

exports.writeMessageGet = (req, res) => {
  res.render("writeMessage", { user: req.user });
};

const validateMessage = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage(`Title cannot be empty`)
    .isLength({ max: 40 })
    .withMessage(`Title cannot have more than 40 characters`),
  body("message")
    .trim()
    .notEmpty()
    .withMessage(`Message cannot be empty`)
    .isLength({ max: 120 })
    .withMessage(`Message cannot have more than 150 characters`),
];

exports.writeMessagePost = [
  validateMessage,
  async (req, res) => {
    console.log(1);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      for (let i = 0; i < errors.array().length; i++) {
        console.error(errors.array()[i].msg);
      }
      return res.status(400).render("writeMessage", { user: req.user, errors: errors.array() });
    }
    const member_id = req.user.id;
    const { title, message } = req.body;
    console.log(member_id);
    console.log(title);
    console.log(message);
    await db.setMessage(member_id, title, message);
    res.redirect("/");
  },
];
