const mongoose = require("mongoose");
const User = require("../model/user.model");

async function getAllUsers(req, res) {
  try {
    const loggedInUser = req.user._id;
    const allUsersData = await User.find({ _id: { $ne: loggedInUser } }).select(
      "-password"
    );

    res.status(200).json({ allUsersData: allUsersData });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
}

module.exports = getAllUsers;
