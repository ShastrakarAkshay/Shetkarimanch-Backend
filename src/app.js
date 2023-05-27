require("dotenv").config();

const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./db");
const routes = require("./app.routes");
const { CONFIG } = require("./app.config");

const PORT = process.env.PORT || 8000;
const app = express();

db.connect();
app.use(
  cors({
    origin: CONFIG.UI_ORIGIN,
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", bodyParser.json(), routes);

app.listen(PORT, () => {
  createDir("./uploads");
  console.log("App is running on port", PORT);
});

const createDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};
