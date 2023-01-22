const userModel = require("../models/userModel");
const cookieToken = require("../utils/JWT_in_CookieParser");

// Get all users
exports.GetUsers = async (req, res, next) => {
  const result = await userModel.find({});
  res.json({ result: result });
};
// Create a new user
exports.CreateUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    // Get the information from the request
    if (!name || !email || !password) {
      throw new Error("all parameters required");
    }
    // Searcching the user
    const ExistingUser = await userModel.findOne({ email });
    if (ExistingUser) {
      ExistingUser.password = undefined;
      return res
        .status(400)
        .json({ message: "User already exist", user: ExistingUser });
    }
    // create a new user
    let User = new userModel({
      name,
      email,
      password,
    });
    await User.save();
    // get the token and set in the cookie and send the user with the token as an response
    cookieToken(User, res);
  } catch (error) {
    throw new Error(error);
  }
};
// Update a user
exports.UpdateUser = async (req, res, next) => {};
// Delete a user
exports.DeleteUser = async (req, res, next) => {};
