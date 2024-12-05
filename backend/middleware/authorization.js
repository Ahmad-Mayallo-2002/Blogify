const { config } = require("dotenv");
const { verify } = require("jsonwebtoken");

config();

const authorization = (req, res, next) => {
  const reqHeader =
    req.headers["authorization"] && req.headers["authorization"];
  const token = reqHeader.split(" ")[1];
  if (!token)
    return res
      .status(403)
      .json({ msg: "Token is Expired or Not Found Sign In Again" });
  verify(token, process.env.JWT_KEY, (error, user) => {
    if (error) return res.status(403).json(error);
    req.user = user;
  });
  next();
};

module.exports.authorization = authorization;
