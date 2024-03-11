require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const AllRoutes = require("./routes/cryptos");

//express app
const app = express();

//connect mangodb
mongoose
  .connect(process.env.MANGO_URI)
  .then(() => {
    //listen  for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port 4000", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
