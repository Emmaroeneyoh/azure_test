const express = require("express");
//using the env
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const mongoose = require('mongoose');
const { createSubscription } = require("./azure/authenticate");
const app = express();

//for customer
const azure = require("./route/azure");
const { DATABASE_URL } = require("./utils");

//connecting the database
const coonectdb = () => {
  let base = DATABASE_URL
    
  mongoose.set("strictQuery", false);
  mongoose
    .connect(base)
    .then(() => console.log("Database connected !"))
    .catch((err) => console.log(err));
};
coonectdb();
createSubscription()

//applying our middleware

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const user = "/user";

//for customer
app.use(azure);

//error handler
app.use((req, res, next) => {
  const error = new Error("api not found");
  error.status = 404;
  res.status(404).json({
    status_code: 404,
    status: false,
    message: error.message,
    data: [],
    error: error.message,
  });
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);

  res.status(500).json({
    status_code: 500,
    status: false,
    message: error.message,
    data: [],
    error: error.message,
  });
});

const port = 5000;

// checkandupdatepackage()
app.listen(port, () => console.log("coonected"));
// registeruser(io)
// chatuser(io)
