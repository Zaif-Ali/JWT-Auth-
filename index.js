const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");
const { PORTNUMBER } = process.env;
const { DATABASE_URL } = process.env;
const cookieParser = require("cookie-parser");
// configuration
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routing
app.use("/api", userRoutes);
// connections to database and server listening
mongoose
  .connect(DATABASE_URL)
  .then(() => {
    app.listen(PORTNUMBER, () => {
      console.log(`Server running on the port ${PORTNUMBER}`);
    });
  })
  .catch(() => {
    console.log(`Error connecting to database`);
  });
