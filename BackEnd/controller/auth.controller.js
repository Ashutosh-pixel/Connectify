const mongoose = require("mongoose");
const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const authToken = require("../utils/authtoken");

async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    const data = await User.findOne({ username });
    const correctpassword = await bcrypt.compare(password, data.password);

    if (!data || !correctpassword) {
      return res.send("Invalid username or password");
    }

    authToken(data._id, res);
    res.status(200).json({
      _id: data._id,
      username: data.username,
      fullname: data.fullname,
      profile: data.profile,
    });
  } catch (error) {
    return res.status(400).json({
      error: "database can't able to save",
      err: error.message,
    });
  }
}

function logout(req, res, next) {
  res.send("hi logout!");
}

async function signup(req, res, next) {
  const { fullname, username, password, gender, confirmPassword } = req.body;

  const data = await User.findOne({ username });

  if (password != confirmPassword) {
    return res.status(400).json({
      error: "password not match",
    });
  }

  if (data) {
    return res.status(400).json({
      error: "user already exist try to login",
    });
  }

  //password hashing process
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Avatar creation
  const boy = `https://avatar.iran.liara.run/public/boy?username=${username}`;
  const girl = `https://avatar.iran.liara.run/public/girl?username=${username}`;

  //save data to mongodb
  try {
    const newUser = await User.create({
      fullname,
      username,
      password: hashedPassword,
      gender,
      profile: gender == "male" ? boy : girl,
    }).then((newUser) => {
      authToken(newUser._id, res);
      return res.status(200).json({
        fullname,
        username,
        gender,
      });
    });
  } catch (error) {
    return res.status(400).json({
      error: "database can't able to save",
      err: error.message,
    });
  }
}

module.exports = {
  login,
  logout,
  signup,
};
