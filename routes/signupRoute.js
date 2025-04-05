const { Router } = require("express");
const signUpRouter = Router();
const signUpCon = require("../controllers/signUpCon");

signUpRouter.get("/", signUpCon.signUpGet);
signUpRouter.post("/", signUpCon.signUpUserPost);

module.exports = signUpRouter;
