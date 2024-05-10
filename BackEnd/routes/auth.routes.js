const express = require("express");
const { login, logout, signup } = require("../controller/auth.controller");

const route = express.Router();

route.post("/login", login);

route.post("/signup", signup);

route.post("/logout", logout);

module.exports = route;
