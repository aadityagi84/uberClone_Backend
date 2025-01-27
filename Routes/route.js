const express = require("express");
const { registerValidator, loginValidator } = require("../helpers/Validator");
const {
  registerController,
  loginController,
  profileController,
  logoutController,
} = require("../controller/UserController");
const { authUser } = require("../middleware/profileauth");
const route = express.Router();

route.post("/register", registerValidator, registerController);

route.post("/login", loginValidator, loginController);
route.get("/profile", authUser, profileController);
route.get("/logout", authUser, logoutController);

module.exports = route;
