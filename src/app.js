require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./db");
const routes = require("./app-routes");
const multer = require("./utils/multer.util");

const PORT = process.env.PORT || 8000;
const app = express();

db.connect();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", bodyParser.json(), routes);

app.listen(PORT, () => {
  //   multer.createDir("./uploads/blogs");
  //   multer.createDir("./uploads/stories");
  console.log("App is running on port", PORT);
});
