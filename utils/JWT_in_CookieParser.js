const getToken = require("../helper/JWT_Token_Create");
const cookieToken = (user, res) => {
  const token = getToken(user._id);
  const options = {
    expires: new Date(Date.now() + 3 * 60 * 24 ),
    httpOnly: true, // when we write this cookie dont manuplate by the user
    secure: true,
    sameSite: "strict",
  };
  (user.password = undefined), // if you are not giving user info in response dont neet to do this
    res.status(200).cookie("token", token, options).json({
      success: true,
      token: token,
      user: user,
    });
};
module.exports = cookieToken;
