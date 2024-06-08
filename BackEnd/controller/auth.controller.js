const mongoose = require("mongoose");
const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const authToken = require("../utils/authtoken");

async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    const data = await User.findOne({ username });

    if (!data) {
      return res.status(404).json({
        error: "User not exist",
      });
      // throw new Error("User not exist");
    }
    const correctpassword = await bcrypt.compare(password, data.password);
    if (!correctpassword) {
      return res.status(400).json({
        error: "password incorrect",
      });
      // throw new Error("password incorrect");
    }

    authToken(data._id, res);
    res.status(200).json({
      _id: data._id,
      username: data.username,
      fullname: data.fullname,
      profile: data.profile,
    });
  } catch (error) {
    return res.status(400);
  }
}

function logout(req, res, next) {
  if (req.cookies.jwt) {
    res.clearCookie("jwt");
  }
  return res.status(200).json({
    message: "logout",
  });
}

async function signup(req, res, next) {
  const { fullname, username, password, gender, confirmpassword } = req.body;

  const data = await User.findOne({ username });

  if (password != confirmpassword) {
    return res.status(400).json({
      message: "password not match",
    });
  }

  if (data) {
    return res.status(400).json({
      message: "user already exist try to login",
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
    })
      //handle promise
      .then((newUser) => {
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
