const jwt = require("jsonwebtoken");

function authToken(userID, res) {
  const token = jwt.sign({ userID }, process.env.SECRET_KEY, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 1000 * 60 * 60 * 24 * 15,
    httpOnly: true,
    sameSite: "strict",
  });
}

module.exports = authToken;
