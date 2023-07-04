const express       = require("express");
const dotenv        = require("dotenv");
const { connect }   = require("./config/db");
const mainRouter    = require("./routers/mainRouter");

dotenv.config();

connect();

const app = express();

app.use(express.json());

app.use("/api", mainRouter);

module.exports = app;