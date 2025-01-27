const { userModel } = require("../model/UserModel"); // Ensure this is the correct path and it's exporting the model
require("dotenv").config();
const jwt = require("jsonwebtoken");
const BlackList = require("../model/blackListModel");

module.exports.authUser = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - Token Missing" });
    }

    // Check if the token is blacklisted
    const isBlackListed = await BlackList.findOne({ token: token });
    if (isBlackListed) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Blacklisted Token" });
    }

    // Verify the token
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decode.id);

    // Find the user in the database
    const userdata = await userModel.findById(decode.id); // Use findById instead of findOne
    console.log("User Data:", userdata);
    if (!userdata) {
      return res.status(401).json({ message: "Unauthorized - User Not Found" });
    }

    req.user = userdata;
    return next();
  } catch (error) {
    console.error("Error in auth middleware:", error);
    return res.status(401).json({ message: "Unauthorized - Invalid Token" });
  }
};
