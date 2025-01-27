const { check } = require("express-validator");

exports.registerValidator = [
  // Check for firstname
  check("firstname")
    .not()
    .isEmpty()
    .withMessage("Firstname is required")
    .isLength({ min: 3 })
    .withMessage("Firstname should be at least 3 characters long")
    .matches(/^[a-zA-Z]+$/)
    .withMessage("Firstname should only contain letters"),
  // Check for email
  check("email")
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .isLength({ min: 5 })
    .withMessage("Email should be at least 5 characters long"),

  // Check for password
  check("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password should contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password should contain at least one lowercase letter")
    .matches(/\d/)
    .withMessage("Password should contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password should contain at least one special character"),
];
exports.loginValidator = [
  check("email")
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .isLength({ min: 5 })
    .withMessage("Email should be at least 5 characters long"),

  // Check for password
  check("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password should contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password should contain at least one lowercase letter")
    .matches(/\d/)
    .withMessage("Password should contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password should contain at least one special character"),
];
