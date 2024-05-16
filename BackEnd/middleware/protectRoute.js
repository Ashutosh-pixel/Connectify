const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

async function protectRoute(req, res, next) {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        error: "unauthorized no token found",
      });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({
        error: "unauthorized invalid token",
      });
    }

    const user = await User.findById(decoded.userID);

    if (!user) {
      res.status(404).json({
        error: "user not found",
      });
    }

    req.user = user;

    // console.log(req.user);

    next();
  } catch (error) {
    res.status(401).json({
      error: "internal server error",
      err: error,
    });
  }
}

module.exports = protectRoute;
