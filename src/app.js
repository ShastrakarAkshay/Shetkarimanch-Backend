require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./db");
const routes = require("./app-routes");

const PORT = process.env.PORT || 8000;
const app = express();
const jsonParser = bodyParser.json();

db.connect();
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/api", jsonParser, routes);

app.listen(PORT, () => console.log("App is running on port", PORT));
