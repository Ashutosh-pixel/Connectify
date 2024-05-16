const express = require("express");
const sendMessage = require("../controller/sendmessage.controller");
const protectRoute = require("../middleware/protectRoute");

const router = express.Router();

router.post("/send/:recieverId", protectRoute, sendMessage);

module.exports = router;
