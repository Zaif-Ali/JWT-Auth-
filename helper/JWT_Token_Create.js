const jwt = require("jsonwebtoken");


const getToken = (userId) => {
  return jwt.sign({ userId: userId }, process.env.JWT_Secret_Key , {expiresIn : '1d'});
};

module.exports = getToken;
