const express = require("express");
const {
  GetUsers,
  CreateUser,
  UpdateUser,
  DeleteUser,
} = require("../controllers/userControllers");
const VerifyToken = require("../middleware/VerifyToken");
const userRoutes = express.Router();
// Route configuration
userRoutes.route("/users/get").get(VerifyToken, GetUsers);
userRoutes.route("/users/post").post(CreateUser);
userRoutes.route("/users/put/:id").put(VerifyToken, UpdateUser);
userRoutes.route("/users/delete/:id").delete(VerifyToken, DeleteUser);
// Exporting routes
module.exports = userRoutes;
