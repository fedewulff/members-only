const { Router } = require("express");
const logInRouter = Router();
const logInCon = require("../controllers/logInCon");
const passport = require("passport");
require("../authentication");

logInRouter.get("/", logInCon.logInGet);
logInRouter.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

module.exports = logInRouter;
