const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const VerifyToken = async (req, res, next) => {
  // Get the token from the server of the user
  const token = req.cookies.token;
  if (typeof token !== "undefined") {
    const { JWT_Secret_Key } = process.env;
    // verify the token
    jwt.verify(token, JWT_Secret_Key, (err, decoded) => {
      // if the token is expired
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token is expired" });
      }
    });
    // if not expired
    const decoded = jwt.verify(token, JWT_Secret_Key);
    const userId = decoded.userID;

    // check the token validity
    const userCheck = await userModel.findOne({ userId });
    if (!userCheck) {
      return res.json({ message: "Invalid token" });
    }
    req.user = await userModel.findOne({ userId });
    next();
  } else {
    return res.json({ message: "Token not given" });
  }
};
module.exports = VerifyToken;
