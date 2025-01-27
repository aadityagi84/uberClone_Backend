const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/db");
const app = express();
const PORT = process.env.PORT || 3000;
const userRoute = require("./Routes/route");
const cookieParser = require("cookie-parser");

// cors
// for developement we will use from all types of request but on production level we will chnage the cors setting
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// dbconnection
dbConnection();
app.get("/", (req, res) => {
  res.send("<h1>hello</h1>");
});

// routes
app.use("/api", userRoute);
app.listen(PORT, () => {
  console.log(`Server will be worked on http://localhost:${PORT}`);
});
