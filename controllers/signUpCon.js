const { body, validationResult } = require("express-validator");
const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

exports.signUpGet = (req, res) => {
  res.render("signup");
};

const validateSignUp = [
  body("first_name")
    .trim()
    .notEmpty()
    .withMessage(`First name cannot be empty`)
    .isAlpha()
    .withMessage(`First name must only contain letters`)
    .isLength({ min: 2, max: 40 })
    .withMessage(`First name must be between 2 and 40 characters`),
  body("last_name")
    .trim()
    .notEmpty()
    .withMessage(`First name cannot be empty`)
    .isAlpha()
    .withMessage(`Last name must only contain letters`)
    .isLength({ min: 2, max: 40 })
    .withMessage(`First name must be between 2 and 40 characters`),
  body("username")
    .trim()
    .notEmpty()
    .withMessage(`First name cannot be empty`)
    .isLength({ min: 2, max: 40 })
    .withMessage(`First name must be between 2 and 40 characters`)
    .custom(async (username) => {
      const user = await db.doesUsernameExist(username);
      if (user[0]) {
        throw new Error("Username already in use");
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(`First name cannot be empty`)
    .isLength({ min: 2, max: 40 })
    .withMessage(`First name must be between 2 and 40 characters`),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage(`First name cannot be empty`)
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return value === req.body.password;
    })
    .isLength({ min: 2, max: 40 })
    .withMessage(`First name must be between 2 and 40 characters`),
];

exports.signUpUserPost = [
  validateSignUp,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      for (let i = 0; i < errors.array().length; i++) {
        console.error(errors.array()[i].msg);
      }
      return res.status(400).render("sign-up", { errors: errors.array() });
    }
    const { first_name, last_name, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.postSignUpData(first_name, last_name, username, hashedPassword);
    res.redirect("/");
  },
];
