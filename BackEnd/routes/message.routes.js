const express = require("express");
const sendMessage = require("../controller/sendmessage.controller");
const protectRoute = require("../middleware/protectRoute");
const getMessage = require("../controller/getmessages.controller");
const unreadMessage = require("../controller/unreadmessages.controller");
const markAsRead = require("../controller/markasread.controller");

const router = express.Router();

router.post("/send/:recieverId", protectRoute, sendMessage);
router.post("/markasread", protectRoute, markAsRead);
router.get("/recieve/:recieverId", protectRoute, getMessage);
router.get("/unread/", protectRoute, unreadMessage);

module.exports = router;
