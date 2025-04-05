const { Router } = require("express");
const writeMessageRouter = Router();
const writeMessageCon = require("../controllers/writeMessageCon");

writeMessageRouter.get("/", writeMessageCon.writeMessageGet);
writeMessageRouter.post("/", writeMessageCon.writeMessagePost);

module.exports = writeMessageRouter;
