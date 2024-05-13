const jwt = require("jsonwebtoken");

function authToken(payload, res) {
  const token = jwt.sign({ payload }, process.env.SECRET_KEY, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 1000 * 60 * 60 * 24 * 15,
    httpOnly: true,
    sameSite: "strict",
  });
}

module.exports = authToken;
