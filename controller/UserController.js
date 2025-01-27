const { validationResult } = require("express-validator");
const { userModel } = require("../model/UserModel");
const bcrypt = require("bcrypt");
const BlackList = require("../model/blackListModel");

const registerController = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, email, password } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Hash the password

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new userModel({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password: hashedPassword,
    });

    // Save user to the database
    const savedUser = await newUser.save();

    // Generate token
    const token = newUser.generateAuth();

    // Respond with success
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: savedUser._id,
        email: savedUser.email,
        fullname: savedUser.fullname,
      },
    });
  } catch (error) {
    console.error("Error in registerController:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).send({ msg: "Invalid Email or Password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ msg: "Invalid Email or Password" });
    }
    const token = user.generateAuth();
    res.cookie("token", token, {
      httpOnly: true, // Prevents JavaScript from accessing cookies
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      maxAge: 3600000, // Cookie expires in 1 hour (3600 seconds)
      sameSite: "strict", // Ensures the cookie is only sent for same-site requests
    });

    res.status(200).send({ token, user, msg: "Login Successfully" });
  } catch (error) {
    res.send(500).json({ message: "Internal Server Error" });
    console.error("Error in loginController:", error);
  }
};

const profileController = async (req, res) => {
  const user = req.user;
  res.status(200).json({ user: req.user });
};

const logoutController = async (req, res) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await BlackList.create({ token });
  res.status(200).json({ message: "Logout Successfully" });
};
module.exports = {
  registerController,
  loginController,
  profileController,
  logoutController,
};
