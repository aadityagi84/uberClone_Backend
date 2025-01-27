const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = () => {
  return mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error in database connection:", err);
      if (process.env.NODE_ENV !== "development") {
        process.exit(1); // Exit only in production
      }
    });
};

module.exports = dbConnection;
