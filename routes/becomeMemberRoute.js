const { Router } = require("express");
const becomeMemberRouter = Router();
const becomeMemberCon = require("../controllers/becomeMemberCon");

becomeMemberRouter.get("/", becomeMemberCon.becomeMemberGet);
//becomeMemberRouter.post("/", becomeMemberCon.signUpUserPost);

module.exports = becomeMemberRouter;
