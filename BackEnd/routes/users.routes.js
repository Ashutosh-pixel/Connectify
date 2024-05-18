const express = require("express");
const getAllUsers = require("../controller/getallusers.controller");
const protectRoute = require("../middleware/protectRoute");

const router = express.Router();

router.get("/", protectRoute, getAllUsers);

module.exports = router;
