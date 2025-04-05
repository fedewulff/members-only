const { Router } = require("express");
const homeRouter = Router();
const homeCon = require("../controllers/homeCon");

homeRouter.get("/", homeCon.homeGet);

module.exports = homeRouter;
