const express = require("express");
const sendMessage = require("../controller/sendmessage.controller");
const protectRoute = require("../middleware/protectRoute");
const getMessage = require("../controller/getmessages.controller");

const router = express.Router();

router.post("/send/:recieverId", protectRoute, sendMessage);
router.get("/recieve/:recieverId", protectRoute, getMessage);

module.exports = router;
